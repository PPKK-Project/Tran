import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  API_BASE_URL,
  getAxiosConfig,
  getCategoryFromTypes,
  getPhotoUrl,
} from "./../util/planUtils";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
// API 응답에 맞게 타입을 정의합니다. 실제 데이터 구조에 따라 수정이 필요할 수 있습니다.
interface FlightData {
  airline: string;
  priceKRW: number;
  departureTime: string;
  arrivalTime: string;
  returnDepartureTime: string;
  returnArrivalTime: string;
}
import {
  AddPlanRequest,
  PlaceFilter,
  PlaceSearchResult,
  Travel,
  TravelPlan,
  UpdateTravelRequest,
} from "../util/types";

const updateTravelApi = async (travelId: string, data: UpdateTravelRequest) => {
  const response = await axios.put(`/api/travels/${travelId}`, data);
  return response.data;
};

// ------------------------------------
// 훅 본문
// ------------------------------------
export function useTravelData(travelId?: string) {
  const queryClient = useQueryClient();

  // 여행 기본 정보 조회(Travel)
  const { data: travelInfo, error: travelError } = useQuery<Travel>({
    queryKey: ["travel", travelId],
    queryFn: async () => {
      if (!travelId) return null;
      const res = await axios.get(`/api/travels/${travelId}`);
      return res.data;
    },
    enabled: !!travelId,
  });

  // 여행 세부 일정 조회
  const {
    data: plans = [],
    isLoading: isPlansLoading,
    refetch: refetchPlans,
  } = useQuery<TravelPlan[]>({
    queryKey: ["plans", travelId],
    queryFn: () => fetchTravelPlans(travelId!),
    enabled: !!travelId,
  });

  // 여행 정보 수정 Mutation
  // 우선 스낵바 state 정의
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error" | "info" | "warning";
  }>({
    open: false,
    message: "",
    type: "info",
  });

  const updateTravelMutation = useMutation({
    mutationFn: (newData: UpdateTravelRequest) => {
      if (!travelId) throw new Error("Travel ID가 없습니다.");
      return updateTravelApi(travelId, newData);
    },
    onSuccess: () => {
      // 수정 성공 시 캐시 무효화 -> 데이터 자동 갱신
      queryClient.invalidateQueries({ queryKey: ["travel", travelId] });
      setSnackbar({
        open: true,
        message: "여행 정보가 성공적으로 수정되었습니다.",
        type: "success",
      });
    },
    onError: (err) => {
      console.error("Update failed:", err);
      setSnackbar({
        open: true,
        message: "여행 정보 수정에 실패했습니다.",
        type: "error",
      });
    },
  });

  // --- State 관리 ---
  const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState<PlaceFilter>("all");
  const [filteredPlaces, setFilteredPlaces] = useState<PlaceSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 날짜 선택 모달 (이제 BasicPlan에서 주로 처리하지만, 호환성을 위해 남겨둠)
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [dates, setDates] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  // 지도 중심 좌표 (기본값: 서울)
  const [searchLocation, setSearchLocation] = useState<{
    lat: number;
    lon: number;
  }>({
    lat: 37.5665,
    lon: 126.978,
  });

  // 1-1. 항공권 정보
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [isFlightLoading, setIsFlightLoading] = useState(false);
  const [flightError, setFlightError] = useState<string | null>(null);

  // --- [Effect] travelInfo 로드 시 초기값 설정 ---
  useEffect(() => {
    if (travelInfo) {
      // 날짜가 있으면 state 업데이트
      if (travelInfo.startDate || !travelInfo.endDate) {
        setDates({
          startDate: travelInfo.startDate,
          endDate: travelInfo.endDate,
        });
      }
      // 필요 시 travelInfo의 국가/도시 정보로 searchLocation 업데이트 가능
    }
  }, [travelInfo]);

  // 전체 여행 일수 계산 (startDate ~ endDate)
  const days = useMemo(() => {
    if (!dates.startDate || !dates.endDate) return [];
    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime()); // 날짜 차이 계산 (밀리초)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // 일(days) 단위로 변환
    return Array.from({ length: diffDays }, (_, i) => i + 1);
  }, [dates]);

  // 이미 추가된 장소 ID 목록 (중복 추가 방지용)
  const addedPlansMap = useMemo(() => {
    const map = new Map<number, Set<string>>();
    plans.forEach((p) => {
      if (!map.has(p.dayNumber)) map.set(p.dayNumber, new Set());
      map.get(p.dayNumber)?.add(p.place.googlePlaceId);
    });
    return map;
  }, [plans]);

  // ------------------------------------
  // 핸들러 함수들
  // ------------------------------------

  // 1. 날짜 저장
  const handleSaveDates = async (start: string, end: string) => {
    setDates({ startDate: start, endDate: end });
    updateTravelInfo({ startDate: start, endDate: end }); // 날짜 저장 시 바로 서버 업데이트
    setIsDateModalOpen(false);
  };

  // 2. 여행 정보 수정 함수 (외부 노출용)
  const updateTravelInfo = (data: UpdateTravelRequest) => {
    updateTravelMutation.mutate(data);
  };

  // 3. 장소 검색
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      // 1) 텍스트 검색
      const places = await searchPlacesFromApi(query);
      setFilteredPlaces(places);

      // 2) 첫 번째 결과로 지도 이동
      if (places.length > 0) {
        setSearchLocation({
          lat: places[0].latitude,
          lon: places[0].longitude,
        });
      }
    } catch (err) {
      console.error(err);
      setError("장소 검색 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 4. 일정 추가
  const handleAddPlan = async (place: PlaceSearchResult, day: number) => {
    if (!travelId) return;
    // 상세 정보(전화번호, 영업시간 등) 가져오기
    try {
      await getGooglePlaceDetails(place.placeId);
    } catch (e) {
      console.warn("상세 정보 로드 실패", e);
    }

    // 이미 추가된 장소인지 확인 (UI 처리는 PlanSidebar에서 하지만 여기서도 체크 가능)
    const currentDaySet = addedPlansMap.get(day);
    if (currentDaySet?.has(place.placeId)) {
      setSnackbar({
        open: true,
        message: "이미 해당 날짜에 추가된 장소입니다.",
        type: "warning",
      });
      return;
    }

    // 현재 날짜의 plan 개수 구해서 sequence 정하기
    const currentDayPlans = plans.filter((p) => p.dayNumber === day);
    const nextSequence = currentDayPlans.length + 1;

    const newPlan: AddPlanRequest = {
      googlePlaceId: place.placeId,
      name: place.name,
      address: place.address,
      type:
        place.category === "숙소" ||
        place.category === "관광지" ||
        place.category === "음식점"
          ? place.category
          : "관광지", // fallback
      latitude: place.latitude,
      longitude: place.longitude,
      dayNumber: day,
      sequence: nextSequence,
      memo: null,
      // detail 정보가 있다면 여기서 활용 가능 (백엔드 DTO 확장이 필요할 수도 있음)
    };

    try {
      await addPlanToApi(travelId, newPlan);
      refetchPlans(); // 목록 갱신
      setSnackbar({
        open: true,
        message: "일정이 추가되었습니다.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "일정 추가 실패", type: "error" });
    }
  };

  // 5. 일정 삭제
  const handleDeletePlan = async (planId: number) => {
    if (!travelId) return;
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deletePlanFromApi(travelId, planId);
      refetchPlans();
      setSnackbar({
        open: true,
        message: "일정이 삭제되었습니다.",
        type: "success",
      });
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "일정 삭제 실패", type: "error" });
    }
  };

  // 6. 항공권 검색
  const searchFlights = async (request: FlightSearchRequest) => {
    setIsFlightLoading(true);
    setFlightError(null);
    try {
      const response = await axios.post("/api/flights/search", request);
      setFlights(response.data); 
    } catch (err) {
      console.error("Flight search failed:", err);
      setFlightError("항공권 검색 중 오류가 발생했습니다.");
    } finally {
      setIsFlightLoading(false);
    }
  };

  // Effect: 항공권 정보 불러오기
  useEffect(() => {
    const fetchFlightsData = async () => {
      if (!travelId || !travelInfo?.startDate || !travelInfo?.endDate) {
        // travelId 또는 날짜 정보가 없으면 불러오지 않음
        setFlights([]); // 이전 항공권 정보 초기화
        setIsFlightLoading(false);
        return;
      }

      try {
        setIsFlightLoading(true);
        setFlightError(null);

        const params = {
          depAp: "SEL", // TODO: 추후 여행 정보에서 출발 공항 코드 가져오기
          arrAp: "TYO", // TODO: 추후 여행 정보에서 도착 공항 코드 가져오기
          depDate: travelInfo.startDate.replace(/-/g, ""),
          retDate: travelInfo.endDate.replace(/-/g, ""),
          adult: 1,
        };

        const flightRes = await axios.get("http://localhost:8080/flight", {
          params,
        });
        setFlights(flightRes.data);
      } catch (err) {
        console.error("항공권 정보를 불러오는 데 실패했습니다.", err);
        setFlightError(
          err.message || "항공권 정보를 불러오는 데 실패했습니다."
        );
        setFlights([]); // 에러 발생 시 항공권 정보 초기화
      } finally {
        setIsFlightLoading(false);
      }
    };
    fetchFlightsData();
  }, [travelId, travelInfo?.startDate, travelInfo?.endDate]); // travelId와 여행 날짜 변경 시 재실행

  // UI 컴포넌트에 필요한 모든 것 반환
  return {
    travelInfo,
    updateTravelInfo,
    isDateModalOpen,
    setIsDateModalOpen,
    dates,
    handleSaveDates,
    days,
    
    plans,
    filteredPlaces,
    filter,
    setFilter,
    
    selectedDay,
    setSelectedDay,
    
    searchLocation,
    isLoading,
    error,
    
    handleSearch,
    handleAddPlan,
    handleDeletePlan,

    flights,
    isFlightLoading,
    flightError,
    searchFlights,

    snackbar,
    setSnackbar,
    addedPlansMap,
  };
}

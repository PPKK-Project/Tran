import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';


import PlanSidebar from './PlanSidebar';
import PlanMap from './PlanMap';
import ItinerarySummary from './ItinerarySummary';
import Header from '../main/Header'; 
import { AddPlanRequest, PlaceSearchResult, TravelPlan } from '../../../types';

// --- Mock Data (장소 검색 API가 없으므로 임시 사용) ---
const MOCK_PLACES: PlaceSearchResult[] = [
  { placeId: 101, name: '제주 오션뷰 호텔', category: '숙소', rating: 4.8, reviewCount: 328, imageUrl: 'https://placehold.co/100x100/a0c4ff/ffffff?text=Hotel', price: 180000, latitude: 33.5104, longitude: 126.4913 },
  { placeId: 102, name: '제주 한옥 스테이', category: '숙소', rating: 4.6, reviewCount: 156, imageUrl: 'https://placehold.co/100x100/d8b4fe/ffffff?text=Hanok', price: 220000, latitude: 33.4996, longitude: 126.5311 },
  { placeId: 201, name: '성산일출봉', category: '관광지', rating: 4.7, reviewCount: 1024, imageUrl: 'https://placehold.co/100x100/99f6e4/ffffff?text=Peak', latitude: 33.4580, longitude: 126.9426 },
  { placeId: 301, name: '제주 흑돼지 맛집', category: '음식점', rating: 4.9, reviewCount: 876, imageUrl: 'https://placehold.co/100x100/fecaca/ffffff?text=Food', latitude: 33.5138, longitude: 126.5298 },
];
// -------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

function TravelPlanPage() {
  const { travelId } = useParams<{ travelId: string }>();

  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [availablePlaces, setAvailablePlaces] = useState<PlaceSearchResult[]>(MOCK_PLACES);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * signin.tsx의 로직을 기반으로 인증 헤더를 포함하는 Axios 설정을 반환합니다.
   * 참고: signin.tsx의 getAxiosConfig 로직은 토큰에서 "Bearer "를 제거합니다.
   * 세션 스토리지에 "Bearer {token}"이 저장된다고 가정합니다.
   */
  const getAxiosConfig = (): AxiosRequestConfig => {
    const jwtToken = sessionStorage.getItem("jwt"); // "Bearer {token}"
    const token = jwtToken?.replace("Bearer ", ""); // "{token}"

    return {
      headers: {
        Authorization: token || "", // signin.tsx와 동일하게 Bearer 없이 토큰만 전송
        "Content-Type": "application/json",
      },
    };
  };

  // [API] 여행 일정 불러오기
  useEffect(() => {
    if (!travelId) return;

    const fetchPlans = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get<TravelPlan[]>(
          `${API_BASE_URL}/travels/${travelId}/plans`,
          getAxiosConfig() // 인증 헤더 포함
        );
        setPlans(response.data);
      } catch (err) {
        console.error("여행 일정 로딩 실패:", err);
        setError("일정을 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [travelId]);

  
  // [이벤트 핸들러]
  // 1. 일정 추가
  const handleAddPlan = async (place: PlaceSearchResult) => {
    // DTO에 맞게 sequence 계산 (현재 선택된 날짜의 일정 개수 + 1)
    const newSequence = plans.filter(p => p.dayNumber === selectedDay).length + 1;

    const newPlanRequest: AddPlanRequest = {
      placeId: place.placeId,
      dayNumber: selectedDay,
      sequence: newSequence,
      memo: "" // TODO: 메모 입력 UI 추가 시 값 변경
    };

    try {
      const response = await axios.post<TravelPlan>(
        `${API_BASE_URL}/travels/${travelId}/plans`, 
        newPlanRequest,
        getAxiosConfig() // 인증 헤더 포함
      );
      
      setPlans(prevPlans => [...prevPlans, response.data]);

    } catch (err) {
      console.error("일정 추가 실패:", err);
      alert("일정 추가에 실패했습니다.");
    }
  };

  // 2. 일정 삭제
  const handleDeletePlan = async (planId: number) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/travels/${travelId}/plans/${planId}`,
        getAxiosConfig() // 인증 헤더 포함
      );
      setPlans(prevPlans => prevPlans.filter(plan => plan.planId !== planId));
    } catch (err) {
      console.error("일정 삭제 실패:", err);
      alert("일정 삭제에 실패했습니다.");
    }
  };

  // [렌더링]
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      {/* 검색 바 (이미지 상단) */}
      <div className="bg-white p-4 border-b shadow-sm">
        <div className="flex gap-4 items-center max-w-6xl mx-auto">
          <input type="text" placeholder="출발지" defaultValue="서울" className="border p-2 rounded-md" />
          <input type="text" placeholder="도착지" defaultValue="제주도" className="border p-2 rounded-md" />
          <input type="date" defaultValue="2025-01-15" className="border p-2 rounded-md" />
          <input type="date" defaultValue="2025-01-18" className="border p-2 rounded-md" />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md font-semibold">검색</button>
        </div>
      </div>

      {/* 메인 콘텐츠 (3단) */}
      <div className="flex-1 flex overflow-hidden">
        {/* 1. 왼쪽 사이드바 */}
        <aside className="w-1/3 max-w-md bg-white border-r overflow-y-auto shadow-lg z-10">
          <PlanSidebar
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            availablePlaces={availablePlaces}
            addedPlanIds={plans.map(p => p.planId)} 
            onAddPlace={handleAddPlan}
            onDeletePlace={handleDeletePlan} 
          />
        </aside>

        {/* 2. 중앙 지도 */}
        <main className="flex-1 relative">
          <PlanMap
            plans={plans.filter(plan => plan.dayNumber === selectedDay)} 
          />
        </main>

        {/* 3. 오른쪽 요약 */}
        <aside className="w-1/4 max-w-sm bg-white border-l overflow-y-auto shadow-lg z-10">
          <ItinerarySummary
            plans={plans}
            onDeletePlan={handleDeletePlan}
          />
        </aside>
      </div>
    </div>
  );
}

export default TravelPlanPage;
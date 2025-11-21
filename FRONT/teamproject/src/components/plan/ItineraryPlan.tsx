import { useParams } from "react-router-dom";
import { useTravelData } from "../../hooks/useTravelData";
import { PlaceSearchBar } from "./PlaceSearchBar";
import PlanSidebar from "./PlanSidebar";
import PlanMap from "./PlanMap";
import ItinerarySummary from "./ItinerarySummary";
import { Alert, Snackbar } from "@mui/material";

function ItineraryPlan() {
  const { travelId } = useParams<{ travelId: string }>();

  // useTravelData 훅 재사용 (BasicPlan과 데이터 공유)
  const {
    travelInfo, // 출발지, 도착지 정보 등 확인용
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
    snackbar,
    setSnackbar,
    addedPlansMap,
    isFlightLoading,
    days,
  } = useTravelData(travelId);

  return (
    <div className="flex flex-col h-full relative">
      {/* 1. 장소 검색 바 (상단) */}
      <div className="bg-white border-b shadow-sm z-10">
        <PlaceSearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          destination={travelInfo?.title || "여행지"} 
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 text-sm text-center border-b border-red-100">
          {error}
        </div>
      )}

      {/* 2. 메인 콘텐츠 (3단 레이아웃) */}
      <div className="flex-1 flex overflow-hidden">
        {/* 좌측: 검색 결과 및 날짜별 장소 추가 */}
        <aside className="w-1/3 max-w-md bg-white border-r overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <PlanSidebar
            days={days}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            availablePlaces={filteredPlaces}
            addedGooglePlaceIds={plans.map((p) => p.place.googlePlaceId)}
            addedPlansMap={addedPlansMap}
            onAddPlace={handleAddPlan}
            onDeletePlace={handleDeletePlan}
            filter={filter}
            onFilterChange={setFilter}
          />
        </aside>

        {/* 중앙: 지도 */}
        <main className="flex-1 relative">
          <PlanMap
            plans={plans.filter((plan) => plan.dayNumber === selectedDay)}
            searchPlaces={filteredPlaces}
            onAddPlace={handleAddPlan}
            mapCenter={{ lat: searchLocation.lat, lng: searchLocation.lon }}
          />
        </main>

        {/* 우측: 전체 일정 요약 */}
        <aside className="w-1/4 max-w-sm bg-white border-l overflow-y-auto shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10">
          <ItinerarySummary
            plans={plans}
            onDeletePlan={handleDeletePlan}
            isFlightLoading={isFlightLoading}
          />
        </aside>
      </div>

      {/* 알림 메시지 (Snackbar) */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))} 
          severity={snackbar.type} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ItineraryPlan;
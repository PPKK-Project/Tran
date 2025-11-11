import React from "react";
import { PlaceSearchResult} from "../../../types";

type Props = {
  selectedDay: number;
  onSelectDay: (day: number) => void;
  availablePlaces: PlaceSearchResult[];
  addedPlanIds: number[];
  onAddPlace: (place: PlaceSearchResult) => void;
  onDeletePlace: (planId: number) => void;
}

// 이미지의 왼쪽 '숙소 (12)' 카드 예시
const PlaceCard: React.FC<{
  place: PlaceSearchResult;
  isAdded: boolean;
  onAdd: () => void;
}> = ({ place, isAdded, onAdd }) => (
  <div className="flex gap-4 p-3 border-b hover:bg-gray-50">
    <img
      src={place.imageUrl}
      alt={place.name}
      className="w-24 h-24 rounded-md object-cover"
      onError={(e) =>
        (e.currentTarget.src =
          "https://placehold.co/100x100/cccccc/ffffff?text=Error")
      }
    />
    <div className="flex-1">
      <h3 className="font-semibold text-lg">{place.name}</h3>
      <p className="text-sm text-gray-600">
        ⭐ {place.rating} (리뷰 {place.reviewCount})
      </p>
      {/* Mock 데이터의 category 필드 사용 */}
      <p className="text-sm text-gray-500">{place.category}</p>
      {place.price && (
        <p className="font-bold text-lg mt-1">
          ₩{place.price.toLocaleString()}
        </p>
      )}
    </div>
    <div className="flex items-center">
      <button
        onClick={onAdd}
        disabled={isAdded}
        className={`w-10 h-10 flex items-center justify-center rounded-full ${
          isAdded
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isAdded ? "✓" : "+"}
      </button>
    </div>
  </div>
);

const PlanSidebar: React.FC<Props> = ({
  selectedDay,
  onSelectDay,
  availablePlaces,
  addedPlanIds,
  onAddPlace,
}) => {
  const days = [1, 2, 3]; // TODO: 여행 기간에 맞게 동적으로 생성

  return (
    <div className="flex flex-col h-full">
      {/* 1. 날짜 탭 */}
      <div className="flex border-b">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => onSelectDay(day)}
            className={`flex-1 py-3 font-semibold ${
              selectedDay === day
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {day}일차
          </button>
        ))}
        <button className="px-4 py-3 text-gray-500 hover:bg-gray-100">+</button>
      </div>

      {/* 2. 필터 및 정렬 (UI) */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-bold text-xl">필터 & 정렬</h2>
        <button className="text-sm text-gray-500">초기화</button>
      </div>
      {/* TODO: 카테고리, 정렬: 추천순 구현 */}

      {/* 3. 장소 목록 (스크롤) */}
      <div className="flex-1 overflow-y-auto">
        {availablePlaces.length === 0 && (
          <p className="p-4">검색 결과가 없습니다.</p>
        )}
        {availablePlaces.map((place) => (
          <PlaceCard
            key={place.placeId}
            place={place}
            // TODO: '추가됨' 로직을 더 정교하게 수정해야 함 (placeId와 planId 매칭)
            isAdded={false}
            onAdd={() => onAddPlace(place)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanSidebar;

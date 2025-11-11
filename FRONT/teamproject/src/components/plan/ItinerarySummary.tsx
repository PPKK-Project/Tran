import React from 'react';
import { TravelPlan } from '../../../types';

type Props = {
  plans: TravelPlan[]; // '전체' 일정 목록
  onDeletePlan: (planId: number) => void;
}

const ItinerarySummary: React.FC<Props> = ({ plans, onDeletePlan }) => {
  
  // 날짜별로 그룹화 (dayNumber 필드 사용)
  const plansByDay = plans.reduce((acc, plan) => {
    (acc[plan.dayNumber] = acc[plan.dayNumber] || []).push(plan);
    return acc;
  }, {} as Record<number, TravelPlan[]>);

  return (
    <div className="p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 border-b pb-3">여행 경로</h2>
      
      <div className="flex-1 overflow-y-auto">
        {/* 날짜 순서대로 정렬하기 위해 Object.keys() 정렬 */}
        {Object.keys(plansByDay)
          .map(Number) // 숫자로 변환
          .sort((a, b) => a - b) // 숫자 오름차순 정렬
          .map(day => (
            <div key={day} className="mb-4">
              <h3 className="font-semibold text-lg mb-2">{day}일차</h3>
              <ol className="list-decimal list-inside space-y-2">
                {plansByDay[day]
                  .sort((a, b) => a.sequence - b.sequence) // 'sequence' 필드로 정렬
                  .map((plan) => (
                    <li key={plan.planId} className="flex justify-between items-center group">
                      <div>
                        {/* DTO 변경: plan.place.name */}
                        <span className="font-medium">{plan.place.name}</span>
                        {/* DTO 변경: plan.place.type */}
                        <span className="text-sm text-gray-500 ml-2">({plan.place.type})</span>
                      </div>
                      <button 
                        onClick={() => onDeletePlan(plan.planId)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        삭제
                      </button>
                    </li>
                ))}
              </ol>
            </div>
        ))}
        {plans.length === 0 && (
          <p className="text-gray-500">아직 추가된 일정이 없습니다.</p>
        )}
      </div>

      {/* 하단 요약 */}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span>총 거리</span>
          <span className="font-semibold"> (계산 필요) </span>
        </div>
        <div className="flex justify-between mb-4">
          <span>예상 시간</span>
          <span className="font-semibold"> (계산 필요) </span>
        </div>
        <button className="w-full bg-blue-500 text-white py-3 rounded-md font-bold">
          여행 일정 저장하기
        </button>
      </div>
    </div>
  );
};

export default ItinerarySummary;
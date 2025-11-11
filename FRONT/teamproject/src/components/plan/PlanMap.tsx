import React from 'react';
import { TravelPlan } from '../../../types';

type Props = {
  plans: TravelPlan[]; // 현재 날짜에 해당하는 일정 목록
}

const PlanMap: React.FC<Props> = ({ plans }) => {
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <p className="text-gray-500 text-lg">
        지도 라이브러리 (예: Kakao Maps) 연동 필요
      </p>
      {/* TODO: 지도 연동 시
        plans.map(plan => (
          <MapMarker 
            key={plan.planId}
            position={{ 
              lat: plan.place.latitude, 
              lng: plan.place.longitude 
            }}
            title={plan.place.name}
          />
        ))
      */}
      <pre className="absolute bottom-4 left-4 bg-white p-2 rounded shadow opacity-70 text-xs max-w-xs overflow-auto">
        {/* 디버깅: 지도에 표시될 장소 객체들 */}
        {JSON.stringify(plans.map(p => p.place), null, 2)}
      </pre>
    </div>
  );
};

export default PlanMap;
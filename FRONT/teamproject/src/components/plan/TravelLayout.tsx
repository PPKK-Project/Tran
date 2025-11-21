import { NavLink, Outlet, useParams } from "react-router-dom";


function TravelLayout() {
  const { travelId } = useParams<{ travelId: string }>();
  
  // 탭 스타일 함수
  const getTabClass = ({ isActive }: { isActive: boolean }) =>
    `px-6 py-3 font-semibold text-sm transition-colors duration-200 border-b-2 ${
      isActive
        ? "border-blue-600 text-blue-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* 상단 헤더 & 탭 */}
      <header className="bg-white shadow-sm z-20 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-800">여행 계획하기</h1>
              <nav className="flex space-x-4">
                <NavLink to={`/travels/${travelId}/basic`} className={getTabClass}>
                  기본 설정
                </NavLink>
                <NavLink to={`/travels/${travelId}/itinerary`} className={getTabClass}>
                  일정 계획
                </NavLink>
                <NavLink to={`/travels/${travelId}/flight`} className={getTabClass}>
                  항공권
                </NavLink>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 (Outlet) */}
      <div className="flex-1 relative overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}

export default TravelLayout;
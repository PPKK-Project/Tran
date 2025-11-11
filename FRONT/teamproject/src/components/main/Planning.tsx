import { Link } from "react-router-dom";
import Header from "./Header";

function Planning() {
  return (
    <div className="main-container">
      <Header />
      <div className="hero-content">
        <p className="hero-subtext">계획부터 시작하는, 여행이 쉬워지는</p>
        <h1 className="hero-title">나를 아는 여행</h1>
        <h2 className="hero-brand">Tlan</h2>
        <div className="search-box-wrapper">
          {/* button을 Link 컴포넌트로 변경 */}
          {/* TODO: 
            실제로는 '여행 계획하기'를 누르면 
            POST /travels API가 호출되어 새 Travel이 생성되고, 
            생성된 travelId로 이동해야 합니다. (예: /travels/123)
            지금은 예시로 1번 여행으로 이동시킵니다.
          */}
          <Link 
            to="/travels/1" // 예시: 1번 여행 계획 페이지로 이동
            id="planTripButton"
            className="
                     flex items-center justify-center
                     bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700
                     text-white text-lg font-semibold
                     py-3 px-6 md:py-4 md:px-8
                     rounded-full
                     shadow-xl hover:shadow-2xl
                     transition duration-300 ease-in-out
                     transform hover:-translate-y-0.5
                     focus:outline-none focus:ring-4 focus:ring-cyan-300
                     w-full sm:w-auto
                   "
          >
            <svg className="icon-travel mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            여행 계획하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Planning;
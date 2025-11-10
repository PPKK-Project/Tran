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
          <button id="planTripButton"
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
                ">
            <svg className="icon-travel mr-3" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>

            여행 계획하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Planning;
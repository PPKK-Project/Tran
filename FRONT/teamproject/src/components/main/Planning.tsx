import Header from "./Header";

// Planning.jsx
function Planning() {
  return (
    // 배경 이미지를 전체 화면에 채우고 그 위에 콘텐츠를 띄웁니다.
    <div className="main-container">
      <Header />

      <div className="hero-content">
        <p className="hero-subtext">계획부터 시작하는, 여행이 쉬워지는</p>
        <h1 className="hero-title">나를 아는 여행</h1>
        <h2 className="hero-brand">Tlan</h2>


        <div className="search-box-wrapper">
          <div className="search-box">
            <div className="input-row">
              <div className="input-field">
                <span>✈️</span>
                <input type="text" placeholder="출발 도시" />
              </div>
              <div className="input-field">
                <span>📍</span>
                <input type="text" placeholder="도착 도시" />
              </div>
              <div className="input-field date-field">
                <span>📅</span>
                <input type="date" />
              </div>
              <div className="input-field date-field">
                <span>📅</span>
                <input type="date" />
              </div>
              <button className="search-button">
                <span className="search-icon">🛬</span>검색
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Planning;
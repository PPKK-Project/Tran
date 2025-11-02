// Planning.jsx
function Planning() {
  return (
    <div className="planning-wrapper">
      <div className="search-box">
        {/* <div className="label-row">
          <label>출발지</label>
          <label>도착지</label>
          <label>출발일</label>
          <label>도착일</label>
        </div> */}
        <div className="input-row">
          <div className="input-field">
            <span>✈️</span>
            <input type="text" placeholder="출발 도시" />
          </div>
          <div className="input-field">
            <span>📍</span>
            <input type="text" placeholder="도착 도시" />
          </div>
          <div className="input-field">
            <span>📅</span>
            <input type="date" placeholder="연도. 월. 일." />
          </div>
          <div className="input-field">
            <span>📅</span>
            <input type="date" placeholder="연도. 월. 일." />
          </div>
          <button className="search-button">
            <span className="search-icon">🛬</span>계획 세우기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Planning;
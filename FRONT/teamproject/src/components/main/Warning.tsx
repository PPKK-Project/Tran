function Warning() {

  const ALERT_LEVELS = [
    { level: 0, text: "정상", colorClass: "normal", dotClass: "normal-dot" },
    { level: 1, text: "여행유의", colorClass: "caution", dotClass: "caution-dot" },
    { level: 2, text: "여행자제", colorClass: "warning", dotClass: "warning-dot" },
    { level: 3, text: "철수권고", colorClass: "danger", dotClass: "danger-dot" },
    { level: 4, text: "여행금지", colorClass: "prohibit", dotClass: "prohibit-dot" },
  ];

  return (
    <>
      <div className="warning-container">
        <div className="warning-content">
          <div className="info-block">
            <span className="warning-icon">⚠️</span>
            <span className="info-text">여행정보</span>
          </div>
          <div className="tag-list">
            <div className="tag-inner-wrapper">
              <div className="tag-group">
                <div className="warning-tag level-4">
                  <span className="dot level-4-dot"></span>
                  우크라이나 4단계 (여행금지)
                </div>
                <div className="warning-tag level-3">
                  <span className="dot level-3-dot"></span>
                  이스라엘 3단계 (철수권고)
                </div>
                <div className="warning-tag level-3">
                  <span className="dot level-3-dot"></span>
                  미얀마 3단계 (철수권고)
                </div>
                <div className="warning-tag level-2">
                  <span className="dot level-2-dot"></span>
                  레바논 2단계 (여행자제)
                </div>
                <div className="warning-tag level-2">
                  <span className="dot level-2-dot"></span>
                  이집트 2단계 (여행자제)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="legend-container">
        {ALERT_LEVELS.map((alert) => (
          <div key={alert.level} className="legend-item">
            <span className={`legend-dot ${alert.dotClass}`}></span>
            <span className={`legend-text level-${alert.level}`}>
              {alert.level}단계 ({alert.text})
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Warning;
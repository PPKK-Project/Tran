import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DateSelectionModal from './DateSelectionModal';
import '../../css/BasicPlanPage.css';

// 날짜 포맷팅 헬퍼 함수 (yyyy.MM.dd 형식)
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const BasicPlanPage: React.FC = () => {
  const navigate = useNavigate();

  // --- State 관리 ---
  const [title, setTitle] = useState<string>('');
  const [departure, setDeparture] = useState<string>('');
  const [headCount, setHeadCount] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  // 날짜 선택 모달 상태
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);

  // --- 핸들러 함수들 ---

  // 날짜 선택 완료 핸들러
  const handleDateSelect = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    setIsDateModalOpen(false);
  };

  // 인원 수 조절 핸들러
  const handleHeadCountChange = (delta: number) => {
    setHeadCount(prev => {
      const newValue = prev + delta;
      return newValue < 1 ? 1 : newValue; // 최소 1명
    });
  };

  // 다음 단계(일정 계획)로 이동
  const handleProceedToItinerary = () => {
    if (!title.trim()) {
      alert("여행 제목을 입력해주세요.");
      return;
    }
    if (!startDate || !endDate) {
      alert("여행 기간을 선택해주세요.");
      return;
    }
    if (!departure.trim()) {
      alert("출발지를 입력해주세요.");
      return;
    }

    // 백엔드 연동 시: Create Travel API 호출 -> travelId 획득
    const travelData = {
      title,
      departure,
      headCount,
      startDate,
      endDate
    };
    
    console.log("여행 기본 정보 저장:", travelData);

    // 임시 이동
    navigate('/plan/itinerary', { state: travelData }); 
  };

  return (
    <div className="basic-plan-container">
      <div className="basic-plan-wrapper">
        <h1 className="page-title">여행 기본 계획</h1>
        <p className="page-subtitle">설레는 여행의 첫 걸음을 시작해보세요.</p>

        <div className="plan-form">
          {/* 1. 여행 제목 */}
          <div className="form-group">
            <label htmlFor="travelTitle">여행 제목</label>
            <input
              type="text"
              id="travelTitle"
              className="input-field"
              placeholder="이번 여행의 이름을 지어주세요 (예: 낭만의 파리 여행)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 2. 출발지 입력 */}
          <div className="form-group">
            <label htmlFor="departurePlace">출발지</label>
            <input
              type="text"
              id="departurePlace"
              className="input-field"
              placeholder="어디서 출발하시나요? (예: 인천공항, 서울역)"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>

          {/* 3. 여행 기간 선택 */}
          <div className="form-group">
            <label>여행 기간</label>
            <div 
              className="date-selector-button" 
              onClick={() => setIsDateModalOpen(true)}
            >
              {startDate && endDate ? (
                <span className="selected-date">
                  {formatDate(startDate)} ~ {formatDate(endDate)}
                  <span className="date-duration">
                    ({Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1}일)
                  </span>
                </span>
              ) : (
                <span className="placeholder-text">날짜를 선택해주세요</span>
              )}
              <span className="calendar-icon">📅</span>
            </div>
          </div>

          {/* 4. 인원 수 설정 */}
          <div className="form-group">
            <label>총 여행 인원</label>
            <div className="headcount-counter">
              <button 
                className="counter-btn" 
                onClick={() => handleHeadCountChange(-1)}
                disabled={headCount <= 1}
              >
                -
              </button>
              <span className="count-display">{headCount}명</span>
              <button 
                className="counter-btn" 
                onClick={() => handleHeadCountChange(1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="action-buttons">
          <button className="cancel-btn" onClick={() => navigate(-1)}>
            취소
          </button>
          <button className="submit-btn" onClick={handleProceedToItinerary}>
            일정 계획하기
          </button>
        </div>
      </div>

      {/* 날짜 선택 모달 */}
      <DateSelectionModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};

export default BasicPlanPage;
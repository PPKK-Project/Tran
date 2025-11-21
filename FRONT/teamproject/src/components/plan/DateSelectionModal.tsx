import React, { useState } from 'react';
import '../../css/BasicPlanPage.css';

interface DateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (startDate: Date, endDate: Date) => void;
}

const DateSelectionModal: React.FC<DateSelectionModalProps> = ({ isOpen, onClose, onDateSelect }) => {
  const [startStr, setStartStr] = useState<string>('');
  const [endStr, setEndStr] = useState<string>('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (startStr && endStr) {
      const startDate = new Date(startStr);
      const endDate = new Date(endStr);
      
      if (startDate > endDate) {
        alert('종료일은 시작일보다 빠를 수 없습니다.');
        return;
      }
      
      onDateSelect(startDate, endDate);
    } else {
      alert('시작일과 종료일을 모두 선택해주세요.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '400px'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>
          여행 기간 선택
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>가는 날</label>
            <input 
              type="date" 
              value={startStr}
              onChange={(e) => setStartStr(e.target.value)}
              style={{
                padding: '0.8rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>오는 날</label>
            <input 
              type="date" 
              value={endStr}
              onChange={(e) => setEndStr(e.target.value)}
              min={startStr}
              style={{
                padding: '0.8rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button 
            onClick={onClose}
            style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              color: '#4b5563',
              fontWeight: '600',
              cursor: 'pointer',
              flex: 1
            }}
          >
            취소
          </button>
          <button 
            onClick={handleConfirm}
            style={{
              padding: '0.8rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              flex: 1
            }}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateSelectionModal;
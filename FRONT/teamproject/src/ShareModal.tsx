import React, { useState } from "react";
import "./ShareModal.css"; // 모달 스타일을 위한 CSS 파일

type ShareModalProps = {
  onClose: () => void;
  onShare: (email: string) => void;
  planTitle: string;
};

const ShareModal: React.FC<ShareModalProps> = ({
  onClose,
  onShare,
  planTitle,
}) => {
  const [email, setEmail] = useState("");

  const handleShareClick = () => {
    // 간단한 이메일 형식 유효성 검사
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("올바른 이메일 주소를 입력해주세요.");
      return;
    }
    onShare(email);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>'{planTitle}' 플랜 공유하기</h2>
        <p>공유할 사용자의 이메일을 입력해주세요.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="modal-input"
        />
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            취소
          </button>
          <button onClick={handleShareClick} className="share-button">
            공유
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

// Header.jsx
import { useState, useEffect } from "react";
import SignUp from "../login/SignUp";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import SignIn from "../login/SignIn";

function Header() {
  // localStorage에 토큰이 있는지 확인하여 초기 로그인 상태를 설정합니다.
  const [isLogin, setLogin] = useState(!!localStorage.getItem("jwt"));
  const navigate = useNavigate();

  // isLogin 상태가 변경될 때마다 localStorage를 확인하여 상태를 동기화합니다.
  useEffect(() => {
    const checkLoginStatus = () => setLogin(!!localStorage.getItem("jwt"));
    window.addEventListener("storage", checkLoginStatus); // 다른 탭에서 로그인/로그아웃 시 상태 반영
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      try {
        // JWT의 payload 부분을 디코딩합니다.
        const payload = JSON.parse(atob(token.split(".")[1]));
        // 만료 시간(exp)은 초 단위이므로 1000을 곱해 밀리초로 변환합니다.
        const expirationTime = payload.exp * 1000;

        // 토큰이 만료되었다면 로그아웃 처리합니다.
        if (expirationTime < Date.now()) {
          console.log("토큰이 만료되었습니다.");
          handleLogout();
        }
      } catch (error) {
        console.error("토큰 디코딩 또는 검증 실패:", error);
        // 토큰 형식이 잘못된 경우에도 로그아웃 처리합니다.
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLogin(false);
    navigate("/"); // 로그아웃 후 메인 페이지로 이동
    setSnackbar({
      open: true,
      message: "로그아웃 되었습니다.",
      type: "info",
    });
  };

  const handleLoginSuccess = () => {
    setLogin(true);
    setSnackbar({
      open: true,
      message: "로그인에 성공했습니다!",
      type: "success",
    });
  };

  return (
    // 배경색 없이 투명하게 처리합니다.
    <>
      <header className="header transparent-header">
        <div className="header-left">
          <h1 className="header-brand-name">Tlan</h1>
        </div>

        <div className="header-user-actions">
          {isLogin ? ( // 로딩 중에는 아무것도 표시하지 않음
            <>
              <Link to="/myPage" className="header-my-page">
                마이페이지
              </Link>
              <button className="header-logout" onClick={handleLogout}>
                {" "}
                로그아웃
              </button>
            </>
          ) : (
            <>
              <SignIn setLogin={handleLoginSuccess} />
              <SignUp />
            </>
          )}
        </div>
      </header>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.type as AlertColor}
          sx={{
            width: "auto", // ✅ 글자 수에 맞게 자동 너비
            minWidth: "fit-content",
            borderRadius: "8px",
            px: 2,
            py: 1,
            fontSize: "0.95rem",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Header;

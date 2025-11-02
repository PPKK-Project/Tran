
function Header() {
  return (
    <header className="header">
      <div>
        <img src="./public/Logo.svg" alt="아이콘" className="header-logo"/>
      </div>
      <div className="header-user-actions">
        <button className="header-login">로그인</button>
        <button className="header-signin">회원가입</button>
      </div>
    </header>
  );
}

export default Header;
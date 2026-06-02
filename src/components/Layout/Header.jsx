import './Layout.css';

export default function Header({ currentUser, onLogout, onNavigate }) {
  return (
    <header className="header">
      <div className="header-content container">
        <div className="header-left">
          <h1 className="logo" onClick={() => onNavigate('home')}>
            📚 도서관 관리 시스템
          </h1>
        </div>

        <div className="header-right">
          {currentUser ? (
            <div className="user-menu">
              <span className="user-name">
                {currentUser.name} ({currentUser.username})
              </span>
              <button className="btn-logout" onClick={onLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div>비회원 사용자</div>
          )}
        </div>
      </div>
    </header>
  );
}

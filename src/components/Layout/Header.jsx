import './Layout.css';

export default function Header({ currentUser, onLogout, onNavigate }) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-content">
          <div className="header-top-left">
            <a href="#" className="header-link">평생교육원</a>
            <span className="divider">|</span>
            <a href="#" className="header-link">시청</a>
          </div>
          <div className="header-top-right">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-content">
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
              <div className="user-status">비회원 사용자</div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

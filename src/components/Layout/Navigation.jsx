import './Layout.css';

export default function Navigation({ currentUser, currentPage, onNavigate }) {
  const handleNavigate = (e, page) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <nav className="navigation">
      <div className="nav-content container">
        <ul className="nav-menu">
          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={(e) => handleNavigate(e, 'home')}
            >
              홈
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${currentPage === 'books' ? 'active' : ''}`}
              onClick={(e) => handleNavigate(e, 'books')}
            >
              자료검색
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${currentPage === 'events' ? 'active' : ''}`}
              onClick={(e) => handleNavigate(e, 'events')}
            >
              문화행사
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${currentPage === 'services' ? 'active' : ''}`}
              onClick={(e) => handleNavigate(e, 'services')}
            >
              도서관 서비스
            </a>
          </li>

          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${currentPage === 'notices' ? 'active' : ''}`}
              onClick={(e) => handleNavigate(e, 'notices')}
            >
              공지사항
            </a>
          </li>

          {currentUser && (
            <>
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${currentPage === 'myloans' ? 'active' : ''}`}
                  onClick={(e) => handleNavigate(e, 'myloans')}
                >
                  대출 현황
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${currentPage === 'reservations' ? 'active' : ''}`}
                  onClick={(e) => handleNavigate(e, 'reservations')}
                >
                  예약 현황
                </a>
              </li>

              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                  onClick={(e) => handleNavigate(e, 'profile')}
                >
                  회원정보
                </a>
              </li>
            </>
          )}

          <li className="nav-item">
            <a
              href="#"
              className={`nav-link ${currentPage === 'info' ? 'active' : ''}`}
              onClick={(e) => handleNavigate(e, 'info')}
            >
              도서관정보
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import './Layout.css';

export default function Navigation({ currentUser, currentPage, onNavigate }) {
  return (
    <nav className="navigation">
      <div className="nav-content container">
        <ul className="nav-menu">
          <li>
            <a
              href="#"
              className={currentPage === 'home' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              홈
            </a>
          </li>

          <li>
            <a
              href="#"
              className={currentPage === 'books' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('books');
              }}
            >
              도서 검색
            </a>
          </li>

          {currentUser && (
            <>
              <li>
                <a
                  href="#"
                  className={currentPage === 'myloans' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('myloans');
                  }}
                >
                  대출 현황
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className={currentPage === 'reservations' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('reservations');
                  }}
                >
                  예약 현황
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className={currentPage === 'profile' ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('profile');
                  }}
                >
                  회원정보
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

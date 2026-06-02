import './Dashboard.css';

export default function Dashboard({ currentUser, books, loans, reservations }) {
  const userLoans = currentUser ? loans.filter(l => l.userId === currentUser.id) : [];
  const userReservations = currentUser ? reservations.filter(r => r.userId === currentUser.id) : [];

  const getBookInfo = (bookId) => {
    return books.find(b => b.id === bookId);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>
          {currentUser
            ? `환영합니다, ${currentUser.name}님! 👋`
            : '도서관 관리 시스템에 오신 것을 환영합니다!'}
        </h1>
      </div>

      <div className="dashboard-grid">
        {currentUser && (
          <>
            <div className="dashboard-card">
              <h3>📖 나의 대출 현황</h3>
              <div className="card-content">
                {userLoans.length > 0 ? (
                  <div className="loan-list">
                    {userLoans.map(loan => (
                      <div key={loan.id} className="loan-item">
                        <div className="loan-info">
                          <p className="loan-title">
                            {getBookInfo(loan.bookId)?.title}
                          </p>
                          <p className="loan-date">
                            반납일: {loan.dueDate}
                          </p>
                        </div>
                        <span className={`loan-status ${loan.status}`}>
                          {loan.status === 'loaned' ? '대출중' : '반납완료'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">대출한 도서가 없습니다</p>
                )}
              </div>
            </div>

            <div className="dashboard-card">
              <h3>🔔 나의 예약 현황</h3>
              <div className="card-content">
                {userReservations.length > 0 ? (
                  <div className="reservation-list">
                    {userReservations.map(res => (
                      <div key={res.id} className="reservation-item">
                        <div className="reservation-info">
                          <p className="reservation-title">
                            {getBookInfo(res.bookId)?.title}
                          </p>
                          <p className="reservation-date">
                            예약일: {res.reservationDate}
                          </p>
                        </div>
                        <span className="reservation-position">
                          대기 순번: {res.position}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">예약한 도서가 없습니다</p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="dashboard-card">
          <h3>📚 인기 도서 TOP 5</h3>
          <div className="card-content">
            <div className="top-books">
              {books
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((book, idx) => (
                  <div key={book.id} className="top-book-item">
                    <span className="rank">{idx + 1}</span>
                    <div className="book-details">
                      <p className="book-title">{book.title}</p>
                      <p className="book-author">{book.author}</p>
                    </div>
                    <span className="rating">⭐ {book.rating}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>📊 도서관 통계</h3>
          <div className="card-content">
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">보유 도서</span>
                <span className="stat-value">{books.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">대출 가능</span>
                <span className="stat-value">
                  {books.filter(b => b.available).length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">현재 대출</span>
                <span className="stat-value">
                  {loans.filter(l => l.status === 'loaned').length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">대기 예약</span>
                <span className="stat-value">
                  {reservations.filter(r => r.status === 'waiting').length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="info-box">
          <h3>📖 도서관 이용 안내</h3>
          <ul>
            <li>최대 5권 동시 대출 가능</li>
            <li>대출 기간: 14일</li>
            <li>연장: 1회 가능</li>
            <li>예약 가능한 도서는 자동으로 알림을 보내드립니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

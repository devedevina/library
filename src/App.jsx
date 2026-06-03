import { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import BookSearch from './components/Books/BookSearch';
import { mockBooks, mockUsers, mockLoans, mockReservations } from './data/mockData';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthPage, setIsAuthPage] = useState(true);
  const [authMode, setAuthMode] = useState('login');
  const [users, setUsers] = useState(mockUsers);
  const [books, setBooks] = useState(mockBooks);
  const [loans, setLoans] = useState(mockLoans);
  const [reservations, setReservations] = useState(mockReservations);

  // localStorage에서 사용자 정보 로드
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthPage(false);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsAuthPage(false);
    setCurrentPage('home');
  };

  const handleSignUp = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setIsAuthPage(true);
    setAuthMode('login');
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    if (!currentUser && page !== 'books' && page !== 'home') {
      alert('로그인이 필요합니다');
      return;
    }
    setCurrentPage(page);
  };

  const handleSwitchToSignUp = (e) => {
    e.preventDefault();
    setAuthMode('signup');
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  if (isAuthPage) {
    return (
      <div>
        {authMode === 'login' ? (
          <Login
            onLogin={handleLogin}
            onSwitchToSignUp={handleSwitchToSignUp}
            users={users}
          />
        ) : (
          <SignUp
            onSignUp={handleSignUp}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
      <Navigation
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="main-content container">
        {currentPage === 'home' && (
          <Dashboard
            currentUser={currentUser}
            books={books}
            loans={loans}
            reservations={reservations}
          />
        )}

        {currentPage === 'books' && (
          <BookSearch books={books} currentUser={currentUser} />
        )}

        {currentPage === 'profile' && (
          <div className="page-content">
            <h2>회원정보</h2>
            <div className="profile-card">
              <div className="profile-item">
                <label>이름</label>
                <span>{currentUser?.name}</span>
              </div>
              <div className="profile-item">
                <label>아이디</label>
                <span>{currentUser?.username}</span>
              </div>
              <div className="profile-item">
                <label>이메일</label>
                <span>{currentUser?.email}</span>
              </div>
              <div className="profile-item">
                <label>전화번호</label>
                <span>{currentUser?.phone}</span>
              </div>
              <div className="profile-item">
                <label>가입일</label>
                <span>{currentUser?.joinDate}</span>
              </div>
              <div className="profile-item">
                <label>상태</label>
                <span>{currentUser?.status === 'active' ? '정상' : '비활성'}</span>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'myloans' && (
          <div className="page-content">
            <h2>대출 현황</h2>
            {loans.filter(l => l.userId === currentUser?.id).length > 0 ? (
              <div className="list-grid">
                {loans.filter(l => l.userId === currentUser?.id).map(loan => (
                  <div key={loan.id} className="item-card">
                    <p><strong>도서명:</strong> {books.find(b => b.id === loan.bookId)?.title}</p>
                    <p><strong>대출일:</strong> {loan.loanDate}</p>
                    <p><strong>반납예정일:</strong> {loan.dueDate}</p>
                    <p><strong>상태:</strong> {loan.status === 'loaned' ? '대출중' : '반납완료'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>대출한 도서가 없습니다</p>
            )}
          </div>
        )}

        {currentPage === 'reservations' && (
          <div className="page-content">
            <h2>예약 현황</h2>
            {reservations.filter(r => r.userId === currentUser?.id).length > 0 ? (
              <div className="list-grid">
                {reservations.filter(r => r.userId === currentUser?.id).map(res => (
                  <div key={res.id} className="item-card">
                    <p><strong>도서명:</strong> {books.find(b => b.id === res.bookId)?.title}</p>
                    <p><strong>예약일:</strong> {res.reservationDate}</p>
                    <p><strong>대기순번:</strong> {res.position}</p>
                    <p><strong>상태:</strong> {res.status === 'waiting' ? '대기중' : '준비완료'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>예약한 도서가 없습니다</p>
            )}
          </div>
        )}

        {currentPage === 'events' && (
          <div className="page-content">
            <h2>문화행사</h2>
            <div className="list-grid">
              <div className="item-card">
                <p><strong>행사명:</strong> 저자와의 만남</p>
                <p><strong>일시:</strong> 2024년 6월 15일 오후 2시</p>
                <p><strong>장소:</strong> 본관 3층 시청각실</p>
                <p><strong>내용:</strong> 인기 작가와의 대면 토크</p>
              </div>
              <div className="item-card">
                <p><strong>행사명:</strong> 독서 동아리</p>
                <p><strong>일시:</strong> 매주 토요일 오전 10시</p>
                <p><strong>장소:</strong> 행복도서관 2층</p>
                <p><strong>내용:</strong> 함께 책을 읽고 토론하는 모임</p>
              </div>
              <div className="item-card">
                <p><strong>행사명:</strong> 어린이 책놀이</p>
                <p><strong>일시:</strong> 매주 수요일 오후 3시</p>
                <p><strong>장소:</strong> 나루도서관 유아실</p>
                <p><strong>내용:</strong> 어린이를 위한 스토리텔링</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="page-content">
            <h2>도서관 서비스</h2>
            <div className="list-grid">
              <div className="item-card">
                <p><strong>서비스:</strong> 도서 대출</p>
                <p><strong>설명:</strong> 최대 20권까지 14일간 대출 가능</p>
              </div>
              <div className="item-card">
                <p><strong>서비스:</strong> 도서 예약</p>
                <p><strong>설명:</strong> 대출 불가능한 도서 미리 예약</p>
              </div>
              <div className="item-card">
                <p><strong>서비스:</strong> 상호대차</p>
                <p><strong>설명:</strong> 다른 도서관 자료 대출 신청</p>
              </div>
              <div className="item-card">
                <p><strong>서비스:</strong> 희귀도서열람</p>
                <p><strong>설명:</strong> 특별 도서 열람 신청</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'notices' && (
          <div className="page-content">
            <h2>공지사항</h2>
            <div className="list-grid">
              <div className="item-card">
                <p><strong>제목:</strong> 도서관 휴관 안내</p>
                <p><strong>작성일:</strong> 2024-06-01</p>
                <p><strong>내용:</strong> 시스템 점검으로 6월 3일 휴관합니다.</p>
              </div>
              <div className="item-card">
                <p><strong>제목:</strong> 신규 도서 입고</p>
                <p><strong>작성일:</strong> 2024-05-30</p>
                <p><strong>내용:</strong> 인기 소설 50권이 입고되었습니다.</p>
              </div>
              <div className="item-card">
                <p><strong>제목:</strong> 회원 가입 이벤트</p>
                <p><strong>작성일:</strong> 2024-05-28</p>
                <p><strong>내용:</strong> 신규 회원 대상 특별 이벤트 진행 중</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 'info' && (
          <div className="page-content">
            <h2>도서관정보</h2>
            <div className="info-grid">
              <div className="info-card">
                <h3>본관</h3>
                <p><strong>주소:</strong> 경기도 동두천시</p>
                <p><strong>전화:</strong> 031-8026-3000</p>
                <p><strong>운영시간:</strong> 월~금 09:00~18:00</p>
                <p><strong>휴무일:</strong> 일요일, 공휴일</p>
              </div>
              <div className="info-card">
                <h3>행복도서관</h3>
                <p><strong>주소:</strong> 경기도 동두천시</p>
                <p><strong>전화:</strong> 031-8026-3060</p>
                <p><strong>운영시간:</strong> 월~금 09:00~18:00</p>
                <p><strong>휴무일:</strong> 일요일, 공휴일</p>
              </div>
              <div className="info-card">
                <h3>나루도서관</h3>
                <p><strong>주소:</strong> 경기도 동두천시</p>
                <p><strong>전화:</strong> 031-8026-3090</p>
                <p><strong>운영시간:</strong> 월~금 09:00~18:00</p>
                <p><strong>휴무일:</strong> 일요일, 공휴일</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

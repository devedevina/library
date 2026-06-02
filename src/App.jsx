import { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
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
      </main>
    </div>
  );
}

import { useState, useMemo } from 'react';
import './Books.css';

export default function BookSearch({ books, currentUser }) {
  const [searchCriteria, setSearchCriteria] = useState({
    query: '',
    searchType: 'title',
    category: '',
    available: 'all'
  });

  const categories = ['프로그래밍', '웹개발', '데이터베이스', '인공지능', '과학'];

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // 검색어 필터
      if (searchCriteria.query.trim()) {
        const query = searchCriteria.query.toLowerCase();
        let match = false;

        switch (searchCriteria.searchType) {
          case 'title':
            match = book.title.toLowerCase().includes(query);
            break;
          case 'author':
            match = book.author.toLowerCase().includes(query);
            break;
          case 'publisher':
            match = book.publisher.toLowerCase().includes(query);
            break;
          case 'isbn':
            match = book.isbn.includes(query);
            break;
          default:
            match = true;
        }

        if (!match) return false;
      }

      // 카테고리 필터
      if (searchCriteria.category && book.category !== searchCriteria.category) {
        return false;
      }

      // 대출 가능 여부 필터
      if (searchCriteria.available === 'available' && !book.available) {
        return false;
      }
      if (searchCriteria.available === 'unavailable' && book.available) {
        return false;
      }

      return true;
    });
  }, [books, searchCriteria]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색 로직은 위의 useMemo에서 처리됨
  };

  return (
    <div className="books-container">
      <aside className="search-sidebar">
        <h3>검색 필터</h3>
        <form onSubmit={handleSearch}>
          <div className="search-filter-group">
            <label>검색 유형</label>
            <select
              name="searchType"
              value={searchCriteria.searchType}
              onChange={handleSearchChange}
            >
              <option value="title">제목</option>
              <option value="author">저자</option>
              <option value="publisher">출판사</option>
              <option value="isbn">ISBN</option>
            </select>
          </div>

          <div className="search-filter-group">
            <label>검색어</label>
            <input
              type="text"
              name="query"
              value={searchCriteria.query}
              onChange={handleSearchChange}
              placeholder="검색어를 입력하세요"
            />
          </div>

          <div className="search-filter-group">
            <label>카테고리</label>
            <select
              name="category"
              value={searchCriteria.category}
              onChange={handleSearchChange}
            >
              <option value="">전체</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="search-filter-group">
            <label>대출 가능 여부</label>
            <select
              name="available"
              value={searchCriteria.available}
              onChange={handleSearchChange}
            >
              <option value="all">전체</option>
              <option value="available">대출 가능</option>
              <option value="unavailable">대출 불가</option>
            </select>
          </div>

          <button type="submit" className="search-button">
            검색
          </button>
        </form>
      </aside>

      <main className="books-content">
        <div className="search-header">
          <h2>도서 검색 결과</h2>
          <p className="search-results-count">
            총 {filteredBooks.length}개의 도서를 찾았습니다
          </p>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <div key={book.id} className="book-card">
                <div className="book-cover">
                  <img src={book.cover} alt={book.title} />
                </div>
                <div className="book-info">
                  <h4 className="book-title">{book.title}</h4>
                  <p className="book-author">{book.author}</p>

                  <div className="book-status">
                    <span>{book.publisher}</span>
                    <span className={`book-status-badge ${book.available ? 'badge-available' : 'badge-unavailable'}`}>
                      {book.available ? '대출가능' : '대출불가'}
                    </span>
                  </div>

                  <div className="book-rating">⭐ {book.rating}</div>

                  {currentUser ? (
                    <div className="book-actions">
                      <button className="btn-primary">
                        {book.available ? '대출' : '예약'}
                      </button>
                      <button className="btn-secondary">♥ 찜</button>
                    </div>
                  ) : (
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--medium-gray)' }}>
                      로그인 후 이용 가능
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>검색 결과가 없습니다</h3>
            <p>다른 검색 조건을 시도해보세요</p>
          </div>
        )}
      </main>
    </div>
  );
}

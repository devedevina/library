export const mockBooks = [
  {
    id: 1,
    title: "리액트 완벽 가이드",
    author: "마크 에반스",
    publisher: "위키북스",
    publishDate: "2023-01-15",
    isbn: "9791158391287",
    description: "React의 기초부터 고급까지 완벽하게 배울 수 있는 종합 가이드",
    cover: "https://via.placeholder.com/200x300?text=React+Guide",
    category: "프로그래밍",
    available: true,
    totalCount: 5,
    availableCount: 3,
    reservationCount: 1,
    ebook: false,
    rating: 4.5
  },
  {
    id: 2,
    title: "자바스크립트 완벽 가이드",
    author: "데이비드 플래너건",
    publisher: "한빛미디어",
    publishDate: "2022-06-20",
    isbn: "9791162244037",
    description: "자바스크립트의 모든 것을 다루는 완벽한 참고서",
    cover: "https://via.placeholder.com/200x300?text=JavaScript",
    category: "프로그래밍",
    available: true,
    totalCount: 4,
    availableCount: 2,
    reservationCount: 2,
    ebook: true,
    rating: 4.8
  },
  {
    id: 3,
    title: "혼자 공부하는 HTML+CSS",
    author: "윤인성",
    publisher: "한빛미디어",
    publishDate: "2023-03-10",
    isbn: "9791162244051",
    description: "웹 개발의 기초가 되는 HTML과 CSS를 체계적으로 배우기",
    cover: "https://via.placeholder.com/200x300?text=HTML+CSS",
    category: "웹개발",
    available: false,
    totalCount: 3,
    availableCount: 0,
    reservationCount: 5,
    ebook: false,
    rating: 4.3
  },
  {
    id: 4,
    title: "데이터베이스 설계와 구축",
    author: "C.J. 데이트",
    publisher: "한빛미디어",
    publishDate: "2022-11-05",
    isbn: "9791162244069",
    description: "관계형 데이터베이스 설계의 이론과 실무",
    cover: "https://via.placeholder.com/200x300?text=Database",
    category: "데이터베이스",
    available: true,
    totalCount: 2,
    availableCount: 1,
    reservationCount: 0,
    ebook: false,
    rating: 4.6
  },
  {
    id: 5,
    title: "클린 코드",
    author: "로버트 C. 마틴",
    publisher: "인사이트",
    publishDate: "2013-07-25",
    isbn: "9788966260959",
    description: "아름다운 코드를 작성하기 위한 원칙과 패턴",
    cover: "https://via.placeholder.com/200x300?text=Clean+Code",
    category: "프로그래밍",
    available: true,
    totalCount: 6,
    availableCount: 4,
    reservationCount: 1,
    ebook: true,
    rating: 4.9
  }
];

export const mockUsers = [
  {
    id: 1,
    username: "user1",
    password: "1234", // 실제로는 암호화되어야 함
    email: "user1@example.com",
    name: "김철수",
    phone: "010-1234-5678",
    joinDate: "2023-01-15",
    status: "active"
  },
  {
    id: 2,
    username: "user2",
    password: "1234",
    email: "user2@example.com",
    name: "이영희",
    phone: "010-2345-6789",
    joinDate: "2023-02-20",
    status: "active"
  }
];

export const mockLoans = [
  {
    id: 1,
    userId: 1,
    bookId: 1,
    loanDate: "2024-05-01",
    dueDate: "2024-05-15",
    returnDate: null,
    status: "loaned",
    renewalCount: 0
  },
  {
    id: 2,
    userId: 1,
    bookId: 2,
    loanDate: "2024-04-20",
    dueDate: "2024-05-04",
    returnDate: "2024-05-03",
    status: "returned",
    renewalCount: 1
  }
];

export const mockReservations = [
  {
    id: 1,
    userId: 1,
    bookId: 3,
    reservationDate: "2024-05-10",
    status: "waiting",
    position: 1
  }
];

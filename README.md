# 📚 도서관 관리 시스템

React, HTML, CSS로 개발된 도서관 관리 시스템입니다.

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

서버는 `http://localhost:3000`에서 실행됩니다.

### 빌드

```bash
npm run build
```

## 📋 주요 기능

### 1. 회원 관리
- **회원가입**: 새로운 계정 생성
- **로그인**: 기존 계정으로 로그인
- **회원정보 수정**: 개인정보 관리
- **로그아웃**: 세션 종료

### 2. 도서 검색
- **도서명 검색**: 제목으로 도서 검색
- **저자 검색**: 저자명으로 도서 검색
- **출판사 검색**: 출판사명으로 도서 검색
- **ISBN 검색**: ISBN으로 도서 검색
- **필터링**: 카테고리, 대출 가능 여부로 필터링

### 3. 대출 관리
- **대출 현황 조회**: 현재 대출 중인 도서 확인
- **대출 이력 조회**: 과거 대출 기록 조회
- 정책: 최대 5권 동시 대출, 14일 대출 기간, 1회 연장 가능

### 4. 예약 관리
- **예약 현황 조회**: 예약 도서 확인
- **예약 취소**: 예약 취소 기능
- 자동 알림: 반납 시 예약자에게 알림

### 5. 대시보드
- **인기 도서 TOP 5**: 높은 평점의 도서 표시
- **도서관 통계**: 보유 도서, 대출 중인 도서 등 통계
- **사용자 대출/예약 현황**: 개인별 현황 조회

## 📁 프로젝트 구조

```
library/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── SignUp.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Auth.css
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── Layout.css
│   │   ├── Books/
│   │   │   ├── BookSearch.jsx
│   │   │   └── Books.css
│   │   └── Dashboard/
│   │       ├── Dashboard.jsx
│   │       └── Dashboard.css
│   ├── data/
│   │   └── mockData.js
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── App.css
│   └── index.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🔐 테스트 계정

### Mock 사용자

| 아이디 | 비밀번호 | 이름     |
|--------|---------|----------|
| user1  | 1234    | 김철수   |
| user2  | 1234    | 이영희   |

## 🎨 기술 스택

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.0.0
- **Build Tool**: Vite 4.0.0
- **Styling**: CSS 3
- **State Management**: React Hooks (useState, useEffect, useMemo)

## 📝 기능 구현 로드맵

### 완료된 기능
- ✅ 회원가입/로그인
- ✅ 도서 검색 및 필터링
- ✅ 대시보드
- ✅ 회원정보 조회
- ✅ 대출/예약 현황 조회

### 추가 예정 기능
- [ ] 도서 상세 조회 페이지
- [ ] 실제 대출/예약 기능
- [ ] 리뷰 및 평점 시스템
- [ ] 관리자 페이지
- [ ] 알림 시스템
- [ ] 백엔드 API 연동

## 🔗 사용 가능한 라우트

- `/` - 홈(대시보드)
- `/books` - 도서 검색
- `/profile` - 회원정보 (로그인 필요)
- `/myloans` - 대출 현황 (로그인 필요)
- `/reservations` - 예약 현황 (로그인 필요)

## 📄 라이선스

MIT License

import './Layout.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <h4>도서관 정보</h4>
          <ul>
            <li>
              <strong>본관</strong><br />
              전화: 031-8026-3000 ~ 3009
            </li>
            <li>
              <strong>행복도서관</strong><br />
              전화: 031-8026-3060 ~ 3069
            </li>
            <li>
              <strong>나루도서관</strong><br />
              전화: 031-8026-3090 ~ 3099
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>관련 기관</h4>
          <ul>
            <li><a href="#">국립중앙도서관</a></li>
            <li><a href="#">경기도 도서관</a></li>
            <li><a href="#">도움말</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>정책</h4>
          <ul>
            <li><a href="#">개인정보처리방침</a></li>
            <li><a href="#">이용약관</a></li>
            <li><a href="#">저작권 안내</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2024 도서관 관리 시스템. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

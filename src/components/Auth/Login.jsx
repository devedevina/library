import { useState } from 'react';
import './Auth.css';

export default function Login({ onLogin, onSwitchToSignUp, users }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '아이디를 입력해주세요';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 사용자 검증
    const user = users.find(u => u.username === formData.username);

    if (!user) {
      setMessage('존재하지 않는 아이디입니다');
      return;
    }

    if (user.password !== formData.password) {
      setMessage('비밀번호가 일치하지 않습니다');
      return;
    }

    if (user.status !== 'active') {
      setMessage('비활성 계정입니다. 관리자에게 문의하세요');
      return;
    }

    // 로그인 성공
    onLogin(user);
    setFormData({
      username: '',
      password: ''
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>📚 도서관 관리</h1>
          <p>계정에 로그인하세요</p>
        </div>

        {message && <div className="alert alert-error">{message}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && <div className="auth-error">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <div className="auth-error">{errors.password}</div>}
          </div>

          <button type="submit" className="auth-button">
            로그인
          </button>
        </form>

        <div className="auth-footer">
          <p>
            계정이 없으신가요?{' '}
            <a href="#" onClick={onSwitchToSignUp}>
              회원가입
            </a>
          </p>
          <p style={{ marginTop: 'var(--spacing-md)' }}>
            <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
          </p>
        </div>
      </div>
    </div>
  );
}

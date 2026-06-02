import { useState } from 'react';
import './Auth.css';

export default function SignUp({ onSignUp, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력할 때 해당 필드의 에러 제거
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = '아이디를 입력해주세요';
    } else if (formData.username.length < 3) {
      newErrors.username = '아이디는 3자 이상이어야 합니다';
    }

    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일을 입력해주세요';
    }

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 회원가입 처리
    const newUser = {
      id: Date.now(),
      username: formData.username,
      password: formData.password,
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    onSignUp(newUser);
    setMessage('회원가입이 완료되었습니다! 로그인 해주세요.');
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      name: '',
      phone: ''
    });

    setTimeout(() => {
      onSwitchToLogin();
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1>📚 도서관 관리</h1>
          <p>새로운 계정을 만드세요</p>
        </div>

        {message && <div className="alert alert-success">{message}</div>}

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
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <div className="auth-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <div className="auth-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>전화번호</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="010-1234-5678"
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <div className="auth-error">{errors.phone}</div>}
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

          <div className="form-group">
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력하세요"
              className={errors.confirmPassword ? 'input-error' : ''}
            />
            {errors.confirmPassword && <div className="auth-error">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="auth-button">
            회원가입
          </button>
        </form>

        <div className="auth-footer">
          <p>
            이미 계정이 있으신가요?{' '}
            <a href="#" onClick={onSwitchToLogin}>
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

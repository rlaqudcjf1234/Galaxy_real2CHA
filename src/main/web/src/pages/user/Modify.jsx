import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Modify() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jumin6: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.name.trim().length < 2) {
      newErrors.name = "이름은 2자 이상이어야 합니다.";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    
    if (!/^\d{6}$/.test(formData.jumin6)) {
      newErrors.ssn = "주민등록번호 앞자리 6자리를 입력해주세요.";
    }
    
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "비밀번호는 8자 이상이어야 합니다.";
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      // 사용자 인증
      const verifyResponse = await axios.post("/api/user/verify", {
        name: formData.name,
        email: formData.email,
        jumin6: formData.jumin6
      });
      
      // 비밀번호 변경
      if (verifyResponse.data.verified) {
        await axios.post("/api/user/password/reset", {
          email: formData.email,
          newPassword: formData.newPassword
        });
        
        alert("비밀번호가 성공적으로 변경되었습니다.");
        navigate("/user"); // 로그인 페이지로 이동 경로 수정
      }
    } catch (error) {
      const response = error.response;
      if (response && response.data) {
        setErrors(response.data);
      } else {
        setErrors({ general: "사용자 인증에 실패했습니다." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "auto",
      marginTop: "50px",
      padding: "20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9"
    }}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">비밀번호 찾기</h2>
        
        {/* 이름 입력 */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">이름</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        
        {/* 이메일 입력 */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">이메일</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        
        {/* 주민번호 앞자리 입력 */}
        <div className="mb-3">
          <label htmlFor="ssn" className="form-label">주민등록번호 앞자리</label>
          <input
            type="text"
            className={`form-control ${errors.ssn ? 'is-invalid' : ''}`}
            id="jumin6"
            name="jumin6"
            maxLength="6"
            value={formData.ssn}
            onChange={handleChange}
            required
          />
          {errors.ssn && <div className="invalid-feedback">{errors.ssn}</div>}
        </div>
        
        {/* 새 비밀번호 입력 */}
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">새 비밀번호</label>
          <input
            type="password"
            className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
        </div>
        
        {/* 새 비밀번호 확인 */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">새 비밀번호 확인</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        {/* 일반 에러 메시지 표시 */}
        {errors.general && (
          <div className="alert alert-danger" role="alert">
            {errors.general}
          </div>
        )}
        
        {/* 제출 버튼 */}
        <div className="d-grid gap-2">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '처리중...' : '비밀번호 변경'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/user')} // 경로 수정
          >
            로그인으로 돌아가기
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modify;
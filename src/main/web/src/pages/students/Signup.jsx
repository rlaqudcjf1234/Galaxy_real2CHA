import React, { useState } from 'react';  // useState를 사용하려면 React를 import해야 합니다.
import 'bootstrap/dist/css/bootstrap.min.css';


function Signup() {
  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      idNumber: '',
      address: '',
      referral: '',
      course: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitted Data:', formData);
  
      // 서버로 데이터를 전송하는 로직 (예: axios 사용)
      // axios.post('/api/signup', formData).then(response => { ... }).catch(err => { ... });
    };
  

    return (
        <div className="container mt-5">
          <h2>수강신청</h2>
          <form onSubmit={handleSubmit}>
            {/* 이름 */}
            <div className="mb-3">
              <label className="form-label">이름</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                
              />
            </div>
    
            {/* 이메일 */}
            <div className="mb-3">
              <label className="form-label">이메일</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* 전화번호 */}
            <div className="mb-3">
              <label className="form-label">전화번호</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* 주민등록번호 */}
            <div className="mb-3">
              <label className="form-label">주민등록번호</label>
              <input
                type="text"
                className="form-control"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* 주소 */}
            <div className="mb-3">
              <label className="form-label">주소</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="주소 검색 버튼을 클릭해주세요"
                required
              />
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={() => alert('주소 API 연동 예정')}
              >
                주소 검색
              </button>
            </div>
    
    
            {/* 과정 선택 */}
            <div className="mb-3">
              <label className="form-label">과정 선택</label>
              <select
                className="form-select"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="java">자바</option>
                <option value="react">리액트</option>
                <option value="cloud">클라우드</option>
              </select>
            </div>
    
            {/* 신청 경로 */}
            <div className="mb-3">
              <label className="form-label">신청 경로</label>
              <select
                className="form-select"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                required
              >
                <option value="">선택해주세요</option>
                <option value="friend">지인추천</option>
                <option value="internet">인터넷검색</option>
                <option value="ad">광고</option>
                <option value="other">기타</option>
              </select>
            </div>

            {/* 제출 버튼 */}
            <button type="submit" className="btn btn-primary">
              회원가입
            </button>
          </form>
        </div>
      );
    };


export default Signup;

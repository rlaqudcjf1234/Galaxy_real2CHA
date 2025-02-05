import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState({});
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  // 페이지 최초 데이터 요청
  const fetchCodes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/code/user", {
        params: {
          "page": "classAdd"
        }
      });
      response.data.forEach(item => {
        setCodes(prevCodes => ({
          ...prevCodes,
          [item.name]: item.value
        }));
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    setLoading(true);
    try {
      const formData = new FormData(e.target);
      const response = await axios.post("/api/user/login", formData);
      navigate("/class");
    } catch (error) {
      const response = error.response;
      if (response && response.data) {
        setErrors(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

  // 페이지 최초 이벤트
  useEffect(() => {
    fetchCodes();

  }, []);

  return (
     <div
            style={{
                maxWidth: "400px",
                margin: "auto",
                marginTop: "100px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
            }}
        >
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4">로그인</h2>

                {/* 아이디 입력 */}
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        아이디
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 비밀번호 입력 */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 로그인 정보 기억하기 */}
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                    />
                    <label htmlFor="remember" className="form-check-label">
                        로그인 정보 기억하기
                    </label>
                </div>

                {/* 버튼들 */}
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">
                        로그인
                    </button>
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => alert("비밀번호 찾기 기능 준비 중입니다.")}
                    >
                        비밀번호 찾기
                    </button>
                </div>
            </form>
        </div>
  );
}

export default Login;



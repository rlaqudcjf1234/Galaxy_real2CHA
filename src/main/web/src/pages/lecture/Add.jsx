import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../css/Add.css';

function Add() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        admin_seq : 1,
        name: '', // 강의명(과목명)      
        regDate: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const requestData = {
                table_nm: 'lecture',
                admin_seq: formData.admin_seq,
                name: formData.name,
              // reg_dt는 서버에서 SYSDATE로 처리되므로 제외
            };
    
            console.log('Sending data:', requestData);
    
            const response = await axios.post("/api/lecture/insert", requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.data >= 0) {
                alert("강의가 성공적으로 등록되었습니다.");
                navigate('/lecture');
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            console.error("Server error:", error.response?.data);
            alert("등록 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="lecture-add-container">
            <div className="lecture-add-form-wrapper">
                <h2>강의 등록</h2>
                <form onSubmit={handleSubmit} className="lecture-add-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>등록일자</label>
                            <input
                                type="date"
                                name="regDate"
                                value={formData.regDate}
                                onChange={handleChange}
                                required
                                className="date-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>강의명</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="강의명을 입력하세요"
                        />
                    </div>

                    <div className="button-group">
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? '등록 중...' : '등록하기'}
                        </button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => navigate(-1)}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add;
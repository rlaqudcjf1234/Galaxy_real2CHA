import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function Update() {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        admin_seq: "",
    });

    // 기존 강의 정보 불러오기
    const fetchLecture = async () => {
        try {
            const response = await axios.get("/api/lecture/read", {
                params: {
                    seq: params.id,
                },
            });
            setFormData({
                name: response.data.NAME,
                admin_seq: response.data.ADMIN_SEQ,
            });
        } catch (error) {
            console.error("Error fetching lecture details:", error);
            alert("강의 정보를 불러오는데 실패했습니다.");
            navigate("/lecture");
        } finally {
            setLoading(false);
        }
    };

    // 입력 값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 수정 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            alert("강의명을 입력해주세요.");
            return;
        }

        try {
            await axios.put("/api/lecture/update", {
                seq: Number(params.id),
                name: formData.name,
                admin_seq: formData.admin_seq, // 기존 강사 번호 유지
            });
            
            alert("강의가 성공적으로 수정되었습니다.");
            navigate(`/lecture/read/${params.id}`);
        } catch (error) {
            console.error("Error updating lecture:", error);
            alert("강의 수정에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchLecture();
    }, []);

    if (loading) return <div>로딩중...</div>;

    return (
        <div className="lecture-edit-container">
            <div className="lecture-edit-wrapper">
                <h2>강의 수정</h2>
                <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                        <label htmlFor="name">강의명</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="강의명을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin_seq">강사 번호</label>
                        <input
                            type="text"
                            id="admin_seq"
                            name="admin_seq"
                            value={formData.admin_seq}
                            disabled  // 입력 비활성화
                            className="disabled-input"  // 스타일링을 위한 클래스 추가
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="save-button">
                            저장
                        </button>
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={() => navigate("/lecture")}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
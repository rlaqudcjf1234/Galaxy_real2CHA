import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function Read() {
    const params = useParams();
    const navigate = useNavigate();
    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLecture = async () => {
        try {
            const response = await axios.get("/api/lecture/read", {
                params: {
                    seq: params.id,
                },
            });
            setLecture(response.data);            
        } catch (error) {
            console.error("Error fetching lecture details:", error);
            alert("강의 정보를 불러오는데 실패했습니다.");
            navigate("/lecture");
        } finally {
            setLoading(false);
        }
    };

    // 삭제 함수 추가
    const handleDelete = async () => {
        // 삭제 확인
        if (!window.confirm("정말로 이 강의를 삭제하시겠습니까?")) {
            return;
        }

        try {
            await axios.delete("/api/lecture/delete", {
                params: {
                    seq: Number(params.id)
                },
            });
            alert("강의가 성공적으로 삭제되었습니다.");
            navigate("/lecture"); // 목록 페이지로 이동
        } catch (error) {
            console.error("Error deleting lecture:", error);
            alert("강의 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchLecture();
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (!lecture) return <div>강의를 찾을 수 없습니다.</div>;

    return (
        <div className="lecture-detail-container">
            <div className="lecture-detail-wrapper">
                <h2>강의 상세정보</h2>
                <div className="detail-content">
                    <div className="detail-row">
                        <label>강의 번호:</label>
                        <span>{lecture.SEQ}</span>
                    </div>
                    <div className="detail-row">
                        <label>강사명:</label>
                        <span>{lecture.ADMIN_NAME}</span>
                    </div>
                    <div className="detail-row">
                        <label>강의명:</label>
                        <span>{lecture.NAME}</span>
                    </div>
                    <div className="detail-row">
                        <label>등록일:</label>
                        <span>{lecture.REG_DT}</span>
                    </div>
                </div>
                <div className="button-group">
                    <button 
                        className="edit-button" 
                        onClick={() => navigate(`/lecture/update/${params.id}`)}
                    >
                        수정
                    </button>
                    {/* 삭제 버튼 추가 */}
                    <button 
                        className="delete-button" 
                        onClick={handleDelete}
                    >
                        삭제
                    </button>
                    <button 
                        className="back-button" 
                        onClick={() => navigate("/lecture")}
                    >
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Read;
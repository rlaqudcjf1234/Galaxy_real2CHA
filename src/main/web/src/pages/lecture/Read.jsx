import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import '../../css/Detail.css';

function Read() {
    const params = useParams();
    const navigate = useNavigate();
    const [lecture, setLecture] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchLecture = async () => {
        try {
            const response = await axios.get("/api/lecture/detail", {
                params: {
                    "seq": params.id
                }
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

    useEffect(() => {
        fetchLecture();
    }, []);

    if (loading) 
        return <div>로딩중...</div>;
    if (!lecture) 
        return <div>강의를 찾을 수 없습니다.</div>;
    
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
                        <label>강사 번호:</label>
                        <span>{lecture.ADMIN_SEQ}</span>
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
                    <button className="edit-button" onClick={() => navigate(`/lecture/edit/${id}`)}>
                        수정
                    </button>
                    <button className="back-button" onClick={() => navigate(-1)}>
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Read;
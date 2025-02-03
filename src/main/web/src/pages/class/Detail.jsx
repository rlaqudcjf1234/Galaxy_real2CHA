import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Detail() {
    const { id } = useParams(); // URL에서 ID 가져오기
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/class/detail/${id}`);
                setItem(response.data);
                setFormData(response.data); // 수정 폼 초기화
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/class/update/${id}`, formData);
            alert("수정되었습니다.");
            setEditing(false);
            setItem(formData); // 변경 사항 반영
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div className="container py-3">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>뒤로가기</button>
            {loading ? (
                <p>로딩 중...</p>
            ) : item ? (
                <div>
                    {!editing ? (
                        <div>
                            <h2>{item.SUBJECT} 상세 정보</h2>
                            <table className="table">
                                <tbody>
                                    <tr><th>과목명</th><td>{item.SUBJECT}</td></tr>
                                    <tr><th>회차</th><td>{item.ROUND}</td></tr>
                                    <tr><th>강사</th><td>{item.TEACHER}</td></tr>
                                    <tr><th>강의실</th><td>{item.ROOM}</td></tr>
                                    <tr><th>강의 시작일자</th><td>{item.START_DT}</td></tr>
                                    <tr><th>강의 종료일자</th><td>{item.END_DT}</td></tr>
                                    <tr><th>강의 시작시간</th><td>{item.START_TM}</td></tr>
                                    <tr><th>강의 종료시간</th><td>{item.END_TM}</td></tr>
                                    <tr><th>총인원</th><td>{item.PEOPLE}</td></tr>
                                    <tr><th>등록일자</th><td>{item.REG_DT}</td></tr>
                                    <tr><th>강의상태</th><td>{item.USE_YN}</td></tr>
                                    <tr><th>확정일자</th><td>{item.CONFIRM_DT}</td></tr>
                                </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={() => setEditing(true)}>수정</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2>수정하기</h2>
                            <div className="mb-2">
                                <label>과목명</label>
                                <input type="text" name="SUBJECT" value={formData.SUBJECT} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-2">
                                <label>강사</label>
                                <input type="text" name="TEACHER" value={formData.TEACHER} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-2">
                                <label>강의실</label>
                                <input type="text" name="ROOM" value={formData.ROOM} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-2">
                                <label>강의 시작일자</label>
                                <input type="date" name="START_DT" value={formData.START_DT} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-2">
                                <label>강의 종료일자</label>
                                <input type="date" name="END_DT" value={formData.END_DT} onChange={handleChange} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-success">저장</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditing(false)}>취소</button>
                        </form>
                    )}
                </div>
            ) : (
                <p>데이터를 찾을 수 없습니다.</p>
            )}
        </div>
    );
}

export default Detail;

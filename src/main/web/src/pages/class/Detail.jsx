import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

function Detail() {
    const params = useParams();
    const navigate = useNavigate();
    const [classData, setClassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});

    async function fetchClass() {
        try {
            const response = await axios.get("/api/class/list", { params: params });
            console.log(params.seq);
            setClassData(response.data);
        } catch (error) {
            console.error("Error fetching class details:", error);
            alert("강의 정보를 불러오는데 실패했습니다.");
            navigate("/class");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClass();
    }, [params.seq]);

   
      // 수정 버튼 클릭 시 실행
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 데이터를 수정 후 저장하는 로직 작성
        // 예: axios.put('/api/class/update', formData);
        console.log("Updated data: ", formData);
    };


    

    return (
        <div className="container py-3">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>뒤로가기</button>
            {loading ? (
                <p>로딩 중...</p>
            ) : classData ? (
                <div>
                    {!editing ? (
                        <div>
                            <h2>{classData.SUBJECT} 상세 정보</h2>
                            <table className="table">
                                <tbody>
                                    <tr><th>과목명</th><td>{classData.LECTURE_NAME}</td></tr>
                                    <tr><th>회차</th><td>{classData.ROUND}</td></tr>
                                    <tr><th>강사</th><td>{classData.ADMIN_NAME}</td></tr>
                                    <tr><th>강의실</th><td>{classData.ROOM}</td></tr>
                                    <tr><th>강의 시작일자</th><td>{classData.START_DT}</td></tr>
                                    <tr><th>강의 종료일자</th><td>{classData.END_DT}</td></tr>
                                    <tr><th>강의 시작시간</th><td>{classData.START_TM}</td></tr>
                                    <tr><th>강의 종료시간</th><td>{classData.END_TM}</td></tr>
                                    <tr><th>총인원</th><td>{classData.PEOPLE}</td></tr>
                                    <tr><th>등록일자</th><td>{classData.REG_DT}</td></tr>
                                    <tr><th>강의상태</th><td>{classData.USE_YN}</td></tr>
                                    
                                </tbody>
                            </table>
                            <button className="btn btn-primary" onClick={() => setEditing(true)}>수정</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2>수정하기</h2>
                            <div className="mb-2">
                                <label>과목명</label>
                                <input type="text" name="SUBJECT" value={formData.LECTURE_NAME} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-2">
                                <label>강사</label>
                                <input type="text" name="TEACHER" value={formData.ADMIN_NAME} onChange={handleChange} className="form-control" />
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

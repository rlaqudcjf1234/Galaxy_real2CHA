import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Update = () => {
    const { seq } = useParams();
    const navigate = useNavigate();
    
    // 폼 데이터와 추가 상태 관리
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    
    // 강사 및 강의 목록 상태 추가
    const [admin, setAdmin] = useState([]); // 강사 목록
    const [lectures, setLectures] = useState([]); // 강의 목록

    // 데이터 요청 함수들
    // 강의 상세 정보 불러오기
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/class/read/${seq}`);
            setFormData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("강의 정보를 불러오는데 실패했습니다.");
            navigate("/class");
        } finally {
            setLoading(false);
        }
    };

    // 강사(Admin) 목록 가져오기
    const fetchAdmin = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/admin/use");
            setAdmin(response.data);
        } catch (error) {
            console.error("Error fetching admin:", error);
        } finally {
            setLoading(false);
        }
    };

    // 강의 목록 가져오기
    const fetchLectures = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/lecture/use");
            setLectures(response.data);
        } catch (error) {
            console.error("Error fetching lectures:", error);
            setLectures([]);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 로딩 시 데이터 불러오기
    useEffect(() => {
        fetchData();     // 현재 강의 정보 불러오기
        fetchAdmin();    // 강사 목록 불러오기
        fetchLectures(); // 강의 목록 불러오기
    }, [seq]);

   // handleChange 함수 수정
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        // name이 lecture나 admin일 경우 키 변경
        [name === 'lecture' ? 'LECTURE_SEQ' : 
         name === 'admin' ? 'ADMIN_SEQ' : 
         name]: value
    }));
};

    

    // 수정 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending data:", formData); // 전송 데이터 확인
            await axios.put(`/api/class/update/${seq}`, formData);
            alert("수정이 완료되었습니다.");
            navigate(`/class/read/${seq}`);
        } catch (error) {
            console.error("Error updating data:", error.response?.data);
            alert("수정에 실패했습니다.");
        }
    };

    // 로딩 중 표시
    if (loading) {
        return <div className="text-center">로딩 중...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>강의 관리</em>
                            <strong>강의 수정</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%"/>
                        <col />
                    </colgroup>
                    <tbody>
                        {/* 강의 선택 (드롭다운) */}
                        <tr>
                            <th>강의</th>
                            <td>
                                <select
                                    className="form-control"
                                    name="lecture"
                                    value={formData.LECTURE_SEQ || ''}
                                    onChange={handleChange}
                                    required="required"
                                >
                                    <option value="">강의를 선택하세요</option>
                                    {lectures.length === 0 
                                        ? <option disabled>강의 로딩 중...</option> 
                                        : lectures.map((item) => (
                                            <option key={item.SEQ} value={item.SEQ}>
                                                {item.NAME}
                                            </option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>

                        {/* 강사 선택 (드롭다운) */}
                        <tr>
                            <th>강사</th>
                            <td>
                                <select
                                    className="form-control"
                                    name="admin"
                                    value={formData.ADMIN_SEQ || ''}
                                    onChange={handleChange}
                                    required="required"
                                >
                                    <option value="">강사를 선택하세요</option>
                                    {admin.map((item) => (
                                        <option key={item.SEQ} value={item.SEQ}>
                                            {item.NAME}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>

                        {/* 회차 */}
                        <tr>
                            <th>회차</th>
                            <td>
                                <input
                                    type="number"
                                    name="ROUND"
                                    value={formData.ROUND || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="회차를 입력해주세요"
                                />
                            </td>
                        </tr>

                        {/* 강의실 */}
                        <tr>
                            <th>강의실</th>
                            <td>
                                <input
                                    type="text"
                                    name="ROOM"
                                    value={formData.ROOM || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="강의실을 입력해주세요"
                                />
                            </td>
                        </tr>

                        {/* 시작일자 */}
                        <tr>
                            <th>시작일자</th>
                            <td>
                                <input
                                    type="date"
                                    name="START_DT"
                                    value={formData.START_DT || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </td>
                        </tr>

                        {/* 종료일자 */}
                        <tr>
                            <th>종료일자</th>
                            <td>
                                <input
                                    type="date"
                                    name="END_DT"
                                    value={formData.END_DT || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </td>
                        </tr>

                        <tr>
                        <th>시작시간</th>
                        <td>
                            <input
                                type="time"
                                name="START_TM"
                                value={formData.START_TM || ''}
                                onChange={handleChange}
                                className="form-control"
                                step="600"  
                                
                            />
                        </td>
                    </tr>

                        <tr>
                        <th>종료시간</th>
                        <td>
                            <input
                                type="time"
                                name="END_TM"
                                value={formData.END_TM || ''}
                                onChange={handleChange}
                                className="form-control"
                                step="600"  
                            />
                        </td>
                    </tr>

                        {/* 총인원 */}
                        <tr>
                            <th>총인원</th>
                            <td>
                                <input
                                    type="number"
                                    name="PEOPLE"
                                    value={formData.PEOPLE || ''}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="총인원을 입력해주세요"
                                />
                            </td>
                        </tr>

                        {/* 강의상태 */}
                        <tr>
                            <th>강의상태</th>
                            <td>
                                <input
                                    type="text"
                                    readOnly
                                    value={formData.CODE_NAME || ''}
                                    className="form-control"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">저장</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default Update;
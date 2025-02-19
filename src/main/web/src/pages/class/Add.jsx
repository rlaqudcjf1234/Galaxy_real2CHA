import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({ division: [] });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState([]); // 강사 목록
    const [lectures, setLectures] = useState([]); // 강의 목록

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
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

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
        fetchAdmin();
        fetchLectures(); // 모든 강의 목록 불러오기
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Submitted");
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/class/add", formData);
            navigate("/class");
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors(response.data)
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className="table">
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>강의현황</em>
                            <strong>강의등록</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%"/>
                        <col />
                    </colgroup>
                    <tbody>
                        {/* 강사 선택 */}
                        <tr>
                            <th>강사</th>
                            <td>
                                <select
                                    className="form-control"
                                    name="admin"
                                    defaultValue=""
                                    required="required"
                                >
                                    <option value="">강사를 선택하세요</option>
                                    {admin.map((item) => (
                                        <option key={item.SEQ} value={item.SEQ}>
                                            {item.NAME}
                                        </option>
                                    ))}
                                </select>
                                {errors.admin && <div className="text-danger">{errors.admin}</div>}
                            </td>
                        </tr>

                        {/* 강의 선택 */}
                        <tr>
                            <th>강의</th>
                            <td>
                                <select
                                    className="form-control"
                                    name="lecture"
                                    defaultValue=""
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
                                {errors.lecture && <div className="text-danger">{errors.lecture}</div>}
                            </td>
                        </tr>

                        {/* 회차 */}
                        <tr>
                            <th>회차</th>
                            <td>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="round" 
                                    placeholder="회차를 입력하세요"
                                />
                                {errors.round && <div className="text-danger">{errors.round}</div>}
                            </td>
                        </tr>

                        {/* 강의실 */}
                        <tr>
                            <th>강의실</th>
                            <td>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="room" 
                                    placeholder="강의실을 입력하세요"
                                />
                                {errors.room && <div className="text-danger">{errors.room}</div>}
                            </td>
                        </tr>

                        {/* 강의 시작일자 */}
                        <tr>
                            <th>강의 시작일자</th>
                            <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="start_dt"
                                    required="required"
                                />
                                {errors.start_dt && <div className="text-danger">{errors.start_dt}</div>}
                            </td>
                        </tr>

                        {/* 강의 종료일자 */}
                        <tr>
                            <th>강의 종료일자</th>
                            <td>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="end_dt"
                                    required="required"
                                />
                                {errors.end_dt && <div className="text-danger">{errors.end_dt}</div>}
                            </td>
                        </tr>

                        {/* 강의 시작시간 */}
                        <tr>
                        <th>강의 시작시간</th>
                        <td>
                            <input
                                type="time"
                                className="form-control"
                                name="start_tm"
                                defaultValue="09:00"
                                step="600"  
                                required="required"
                            />
                            {errors.start_tm && <div className="text-danger">{errors.start_tm}</div>}
                        </td>
                    </tr>

                        {/* 강의 종료시간 */}
                        <tr>
                        <th>강의 종료시간</th>
                        <td>
                            <input
                                type="time"
                                className="form-control"
                                name="end_tm"
                                defaultValue="18:00"
                                step="600" 
                                required="required"
                            />
                            {errors.end_tm && <div className="text-danger">{errors.end_tm}</div>}
                        </td>
                    </tr>

                        {/* 교육인원 */}
                        <tr>
                            <th>교육인원</th>
                            <td>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="people" 
                                    placeholder="교육인원을 입력하세요"
                                />
                                {errors.people && <div className="text-danger">{errors.people}</div>}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">등록</button>
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    );
}

export default Add;
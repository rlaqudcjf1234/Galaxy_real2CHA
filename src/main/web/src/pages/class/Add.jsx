import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { authenticatedRequest as axios } from '../../plugins/axios';
const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({ division: [], room: [] });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState([]); // 강사 목록
    const [lectures, setLectures] = useState([]); // 강의 목록

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/room-codes", {
                params: { page: "classAdd" }
            });

            console.log('서버 응답:', response.data);

            if (response.data && response.data.room) {
                setCodes(prevCodes => ({
                    ...prevCodes,
                    room: response.data.room
                }));
            }
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
            if (error.response) {
                console.log('에러 상세:', error.response);
            }
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
        console.log('현재 codes 상태:', codes); // 에러 확인 후 삭제 예정
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
                        <col width="20%" />
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
                                {loading ? (
                                    <p>강의실 데이터 로딩 중...</p>
                                ) : (
                                    <select
                                        className="form-control"
                                        name="room"
                                        defaultValue=""
                                        required="required"
                                    >
                                        <option value="">강의실을 선택하세요</option>
                                        {codes.room && codes.room.map((item) => (
                                            <option key={item.CODE_ID} value={item.CODE_ID}>
                                                {item.CODE_NAME}
                                            </option>
                                        ))}
                                    </select>
                                )}
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
                            <th>모집인원</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="people"
                                    placeholder="모집인원을 입력하세요"
                                />
                                {errors.people && <div className="text-danger">{errors.people}</div>}
                            </td>
                        </tr>

                        <tr>
                            <th>안내사항</th>
                            <td>
                                <p style={{ fontSize: '0.9em', margin: '3px 0', lineHeight: '1.2', textAlign: 'left' }}>
                                    * 강의 확정이 되지 않으면 강의 시작일에 자동으로 강의 개설이 취소됩니다.
                                </p>
                                <p style={{ fontSize: '0.9em', margin: '3px 0', lineHeight: '1.2', textAlign: 'left' }}>
                                    * 강의 확정이 되어야 수강생 모집이 시작됩니다.
                                </p>
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
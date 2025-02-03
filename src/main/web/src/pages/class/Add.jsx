import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
function Add() {

    const navigate = useNavigate();
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({division: []});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [admin, setAdmin] = useState([]); //어드민 목록
    const [lectures, setLectures] = useState([]); // 강의 목록 저장

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "page": "classAdd"
                }
            });
            response
                .data
                .forEach(item => {
                    setCodes({
                        ...codes,
                        [item.name]: item.value
                    });
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // **강사(Admin) 목록 가져오기**
    const fetchAdmin = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/admin/use"); // API 호출
            setAdmin(response.data); // 강사 목록 저장
        } catch (error) {
            if (error.response) {
                console.error("Error fetching admin (response):", error.response);
            } else if (error.request) {
                console.error("Error fetching admin (request):", error.request);
            } else {
                console.error("Error fetching admin (message):", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
        fetchAdmin();

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

    // 추후 실 데이터 코드로 바꿔야함.
    const mockLectures = [
        {
            id: 13,
            name: "홈런스윙 기초"
        }, {
            id: 14,
            name: "외야송구 심화"
        }, {
            id: 15,
            name: "변화구 심화"
        }
    ];

    // 강의 목록을 목데이터로 초기화
    useEffect(() => {
        // 서버 요청 대신 목데이터를 사용
        setLectures(mockLectures);
    }, []);

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "auto"
            }}>
            <form className="AddClass" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label htmlFor="lecture" className="form-label">강의</label>
                    <select className="form-select" name="lecture" value={codes.lecture || ""}
                        // `value`로 설정, 초기에 값이 없으면 빈 문자열로 처리
                        onChange={(e) => setCodes({
                            ...codes,
                            lecture: e.target.value
                        })}
                        // 상태 업데이트
                        required="required">
                        <option value="" disabled="disabled">
                            강의를 선택하세요
                        </option>
                        {
                            lectures.map((lecture) => (
                                <option key={lecture.id} value={lecture.id}>
                                    {lecture.name}
                                    {/* 강의 이름 표시 */}
                                </option>
                            ))
                        }
                    </select>
                    {errors.lecture && <div className="invalid-feedback">{errors.lecture}</div>}
                    {/* 오류 메시지 처리 */}
                </div>
                <div className="col-12">
                    <label htmlFor="round" className="form-label">회차</label>
                    <input type="text" className="form-control" name="round"/>
                </div>

                {/* 강사 선택 */}
                <div className="col-12">
                    <label htmlFor="admin" className="form-label">강사</label>
                    <select className="form-select" name="admin" defaultValue="">
                        <option value="">강사를 선택하세요</option>
                        {
                            admin.map((item) => (
                                <option key={item.SEQ} value={item.SEQ}>
                                    {item.NAME}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="col-md-12">
                    <label htmlFor="room" className="form-label">강의실</label>
                    <input type="text" className="form-control" name="room"/>
                    <div className="invalid-feedback">
                        {errors.room}
                    </div>
                </div>

                {/* 날짜 선택 부분 */}
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="start_dt" className="form-label">강의 시작일자</label>
                        <input
                            type="date"
                            className="form-control"
                            name="start_dt"
                            required="required"/>
                        <div className="invalid-feedback">
                            {errors.start_dt}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="end_dt" className="form-label">강의 종료일자</label>
                        <input type="date" className="form-control" name="end_dt" required="required"/>
                        <div className="invalid-feedback">
                            {errors.end_dt}
                        </div>
                    </div>
                </div>

                {/* 시간 선택 부분 */}
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="start_tm" className="form-label">강의 시작시간</label>
                        <input
                            type="time"
                            className="form-control"
                            name="start_tm"
                            required="required"/>
                        <div className="invalid-feedback">
                            {errors.start_tm}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="end_tm" className="form-label">강의 종료시간</label>
                        <input type="time" className="form-control" name="end_tm" required="required"/>
                        <div className="invalid-feedback">
                            {errors.end_tm}
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <label htmlFor="people" className="form-label">교육인원</label>
                    <input type="text" className="form-control" name="people"/>
                    <div className="invalid-feedback">
                        {errors.people}
                    </div>
                </div>

                <div className="d-flex gap-2 justify-content-end py-1">
                    <button className="btn btn-primary" type="submit">등록</button>
                    <button className="btn btn-primary" type="button" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default Add;
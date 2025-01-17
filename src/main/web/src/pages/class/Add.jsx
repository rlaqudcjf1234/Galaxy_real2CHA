import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Add() {

    const navigate = useNavigate();
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({ division: [] });
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "page": "adminAdd"
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

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        { id: 1, name: "홈런스윙 기초" },
        { id: 2, name: "외야송구 심화" },
        { id: 3, name: "변화구 심화" }
    ];

    const [lectures, setLectures] = useState([]); // 강의 목록 저장

    // 강의 목록을 목데이터로 초기화
    useEffect(() => {
        // 서버 요청 대신 목데이터를 사용
        setLectures(mockLectures);
    }, []);

    // 추후 실 데이터 코드로 바꿔야함.
    const mockTeacher = [
        { id: 1, name: "홍창기" },
        { id: 2, name: "이병규" },
        { id: 3, name: "오지환" }
    ];

    const [teacher, setTeacher] = useState([]); // 강의 목록 저장

    // 강의 목록을 목데이터로 초기화
    useEffect(() => {
        // 서버 요청 대신 목데이터를 사용
        setTeacher(mockTeacher);
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
                    <select
                        className="form-select"
                        name="lecture"
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>
                            강의를 선택하세요
                        </option>
                        {lectures.map((lecture) => (
                            <option key={lecture.id} value={lecture.id}>
                                {lecture.name} {/* 강의 이름 표시 */}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="round" className="form-label">회차</label>
                    <input type="text" className="form-control" name="round" />
                </div>

                <div className="col-12">
                    <label htmlFor="teacher" className="form-label">강사</label>
                    <select
                        className="form-select"
                        name="teacher"
                        defaultValue=""
                        required
                    >
                        <option value="" disabled>
                            강사를 선택하세요.
                        </option>
                        {teacher.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                                {teacher.name} {/* 강의 이름 표시 */}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-12">
                    <label htmlFor="room" className="form-label">강의실</label>
                    <input type="text" className="form-control" name="room" />
                    <div className="invalid-feedback">
                        {errors.room}
                    </div>
                </div>

                {/* 날짜 선택 부분 */}
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="startDate" className="form-label">강의 시작일자</label>
                        <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            required
                        />
                        <div className="invalid-feedback">
                            {errors.startDate}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">강의 종료일자</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            required
                        />
                        <div className="invalid-feedback">
                            {errors.endDate}
                        </div>
                    </div>
                </div>

                {/* 시간 선택 부분 */}
                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="startTime" className="form-label">강의 시작시간</label>
                        <input
                            type="time"
                            className="form-control"
                            name="startTime"
                            required
                        />
                        <div className="invalid-feedback">
                            {errors.startTime}
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="endTime" className="form-label">강의 종료시간</label>
                        <input
                            type="time"
                            className="form-control"
                            name="endTime"
                            required
                        />
                        <div className="invalid-feedback">
                            {errors.endTime}
                        </div>
                    </div>
                </div>


                <div className="col-md-12">
                    <label htmlFor="people" className="form-label">교육인원</label>
                    <input type="text" className="form-control" name="people" />
                    <div className="invalid-feedback">
                        {errors.room}
                    </div>
                </div>


                <div className="col-md-4">
                    <label htmlFor="division" className="form-label">구분</label>
                    <select name="division" className="form-select" defaultValue="">
                        <option value="">선택</option>
                        {
                            codes
                                .division
                                .map(
                                    (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                )
                        }
                    </select>
                    <div className="invalid-feedback">
                        {errors.division}
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
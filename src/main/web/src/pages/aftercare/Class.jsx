import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {authenticatedRequest as axios} from '../../plugins/axios';
import "../../css/aftercare/AftercareInfo.css"; // Info.css 재활용

const Class = () => {
    const { seq } = useParams();
    const [classInfo, setClassInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    // 날짜 포맷을 YYYY-MM-DD 형태로 변환
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString); // ISO 형식 파싱
        // getMonth()는 0부터 시작하므로 +1
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // "2025-01-12"
    };


    // 수강정보 조회 (학생 -> CLASS_SEQ -> CLASS 테이블 + LECTURE, ADMIN)
    const fetchClassData = async () => {
        setLoading(true);
        try {
            // 1) 학생 상세 정보 먼저 가져오기
            const studentRes = await axios.get(`/api/student/read/${seq}`);
            const student = studentRes.data;
            if (!student || !student.CLASS_SEQ) {
                throw new Error("해당 학생의 CLASS_SEQ를 찾을 수 없습니다.");
            }

            // 2) CLASS_SEQ로 수강 정보(조인 결과) 조회
            const classRes = await axios.get("/api/class/read", {
                params: { classSeq: student.CLASS_SEQ }
            });
            setClassInfo(classRes.data);
        } catch (error) {
            console.error("수강 정보 조회 실패:", error);
            alert("수강 정보를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClassData();
    }, [seq]);

    if (loading) {
        return <p className="loading-text">로딩 중...</p>;
    }

    if (!classInfo) {
        return <p className="error-text">수강 정보를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="info-container">
            <h2>수강 정보</h2>
            <div className="info-grid">
                <div className="info-box">
                    <strong>강의명</strong>
                    <span>{classInfo.LECTURE_NAME}</span>
                </div>
                <div className="info-box">
                    <strong>담당 교수</strong>
                    <span>{classInfo.ADMIN_NAME}</span>
                </div>
                <div className="info-box">
                    <strong>회차</strong>
                    <span>{classInfo.ROUND}</span>
                </div>
                <div className="info-box">
                    <strong>강의실</strong>
                    <span>{classInfo.ROOM}호</span>
                </div>
                <div className="info-box">
                    <strong>강의 시작일자</strong>
                    <span>{formatDate(classInfo.START_DT)}</span>
                </div>
                <div className="info-box">
                    <strong>강의 종료일자</strong>
                    <span>{formatDate(classInfo.END_DT)}</span>
                </div>
                <div className="info-box">
                    <strong>강의 총원</strong>
                    <span>{classInfo.PEOPLE}</span>
                </div>
            </div>
        </div>
    );
};

export default Class;

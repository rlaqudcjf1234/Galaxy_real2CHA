import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {authenticatedRequest as axios} from '../../plugins/axios';
import "../../css/aftercare/AftercareInfo.css"; // 스타일 파일 추가

const Info = () => {
    const { seq } = useParams(); // URL에서 학생 seq 가져오기
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);

    const formatPhoneNumber = (phone) => {
        if (!phone) return "";
        const cleanPhone = phone.replace(/\D/g, ""); // 숫자만 남기기
        if (cleanPhone.length === 11) {
            return cleanPhone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        } else if (cleanPhone.length === 10) {
            return cleanPhone.replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
        } else if (cleanPhone.length === 8) {
            return cleanPhone.replace(/(\d{4})(\d{4})/, "$1-$2");
        }
        return phone; // 변환 불가능한 경우 원본 유지
    };

    // 학생 정보 가져오기
    const fetchStudentData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/student/read/${seq}`);
            setStudent(response.data);
        } catch (error) {
            console.error("학생 정보 불러오기 실패:", error);
            alert("학생 정보를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, [seq]);

    return (
        <div className="info-container">
            <h2>기본 정보</h2>
            {loading ? (
                <p className="loading-text">로딩 중...</p>
            ) : student ? (
                <div className="info-grid">
                    <div className="info-box">
                        <strong>이름</strong>
                        <span>{student.NAME}</span>
                    </div>
                    <div className="info-box">
                        <strong>이메일</strong>
                        <span>{student.EMAIL}</span>
                    </div>
                    <div className="info-box">
                        <strong>전화번호</strong>
                        <span>{formatPhoneNumber(student.PHONE)}</span>
                    </div>
                    <div className="info-box">
                        <strong>우편번호</strong>
                        <span>{student.ZIPCODE}</span>
                    </div>
                    <div className="info-box">
                        <strong>실거주 주소</strong>
                        <span>{student.REAL_ADDRESS1}</span>
                    </div>
                    <div className="info-box">
                        <strong>상세 주소</strong>
                        <span>{student.REAL_ADDRESS2}</span>
                    </div>
                    <div className="info-box">
                        <strong>주소</strong>
                        <span>{student.ADDRESS1}</span>
                    </div>
                    <div className="info-box">
                        <strong>주소 상세</strong>
                        <span>{student.ADDRESS2}</span>
                    </div>
                    <div className="info-box">
                        <strong>지원 경로</strong>
                        <span>{student.PATH}</span>
                    </div>
                    <div className="info-box">
                        <strong>ID</strong>
                        <span>{student.ID}</span>
                    </div>
                    <div className="info-box">
                        <strong>등록일자</strong>
                        <span>{new Date(student.REG_DATE).toISOString().split("T")[0]}</span>
                    </div>
                </div>
            ) : (
                <p className="error-text">학생 정보를 찾을 수 없습니다.</p>
            )}
        </div>
    );
};

export default Info;

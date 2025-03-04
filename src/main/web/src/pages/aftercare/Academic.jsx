import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { authenticatedRequest as axios } from '../../plugins/axios';
import "../../css/aftercare/AftercareInfo.css"; // 재활용 CSS

const Academic = () => {
  const { seq } = useParams(); // 학생 시퀀스
  const [loading, setLoading] = useState(false);
  const [academic, setAcademic] = useState(null);

  // 학력정보 조회
  const fetchAcademicData = async () => {
    setLoading(true);
    try {
      // /api/academic/read?studentSeq=xxx
      const res = await axios.get("/api/academic/read", {
        params: { studentSeq: seq },
      });
      setAcademic(res.data);
    } catch (error) {
      console.error("학력 정보 조회 실패:", error);
      alert("학력 정보를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seq) {
      fetchAcademicData();
    }
  }, [seq]);

  if (loading) {
    return <p className="loading-text">로딩 중...</p>;
  }

  // DB에 데이터가 없거나 studentSeq가 없는 경우
  if (!academic || !academic.studentSeq) {
    return (
      <div className="info-container">
        <h2>학력 정보</h2>
        <p className="error-text">학력 정보가 없습니다.</p>
      </div>
    );
  }

  // 최종학력 매핑
  const finalSchoolLevelText = academic.finalSchoolLevel
    ? (parseInt(academic.finalSchoolLevel) === 20 ? '중학교' :
       parseInt(academic.finalSchoolLevel) === 30 ? '고등학교' :
       parseInt(academic.finalSchoolLevel) === 40 ? '대학교(2,3년제)' :
       parseInt(academic.finalSchoolLevel) === 50 ? '대학교(4년제)' :
       parseInt(academic.finalSchoolLevel) === 60 ? '석사졸업' :
       academic.finalSchoolLevel)
    : '없음';

  // 전공여부 매핑
  const finalSchoolSpecialityText = academic.finalSchoolSpeciality
    ? (academic.finalSchoolSpeciality === '0' ? '비전공' :
       academic.finalSchoolSpeciality === '1' ? '전공' :
       academic.finalSchoolSpeciality)
    : '없음';

  // 졸업여부 매핑
  const graduateYnText = academic.graduateYn
    ? (parseInt(academic.graduateYn) === 10 ? '재학주간' :
       parseInt(academic.graduateYn) === 20 ? '재학야간' :
       parseInt(academic.graduateYn) === 30 ? '휴학' :
       parseInt(academic.graduateYn) === 40 ? '중퇴' :
       parseInt(academic.graduateYn) === 50 ? '졸업' :
       parseInt(academic.graduateYn) === 60 ? '검정고시' :
       academic.graduateYn)
    : '없음';

  return (
    <div className="info-container">
      <h2>학력 정보</h2>
      <div className="info-grid">
        <div className="info-box">
          <strong>최종학교명</strong>
          <span>{academic.finalSchoolName || '없음'}</span>
        </div>
        <div className="info-box">
          <strong>최종학력</strong>
          <span>{finalSchoolLevelText}</span>
        </div>
        <div className="info-box">
          <strong>전공여부</strong>
          <span>{finalSchoolSpecialityText}</span>
        </div>
        <div className="info-box">
          <strong>학과</strong>
          <span>{academic.finalSchoolLesson || '없음'}</span>
        </div>
        <div className="info-box">
          <strong>졸업여부</strong>
          <span>{graduateYnText}</span>
        </div>
      </div>
    </div>
  );
};

export default Academic;

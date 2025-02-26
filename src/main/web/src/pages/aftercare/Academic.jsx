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

  // 만약 DB에 없어서 DTO가 null이거나 studentSeq가 null인 경우
  if (!academic || !academic.studentSeq) {
    return (
      <div className="info-container">
        <h2>학력 정보</h2>
        <p className="error-text">학력 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="info-container">
      <h2>학력 정보</h2>
      <div className="info-grid">
        <div className="info-box">
          <strong>최종학교명</strong>
          <span>{academic.finalSchoolName}</span>
        </div>
        <div className="info-box">
          <strong>최종학력</strong>
          <span>{academic.finalSchoolLevel}</span>
        </div>
        <div className="info-box">
          <strong>전공여부</strong>
          <span>{academic.finalSchoolSpeciality}</span>
        </div>
        <div className="info-box">
          <strong>학과</strong>
          <span>{academic.finalSchoolLesson}</span>
        </div>
        <div className="info-box">
          <strong>졸업여부</strong>
          <span>{academic.graduateYn}</span>
        </div>
      </div>
    </div>
  );
};

export default Academic;

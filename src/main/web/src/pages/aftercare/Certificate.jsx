import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from '../../plugins/axios';
import "../../css/aftercare/AftercareInfo.css";

const Certificate = () => {
  const { seq } = useParams();
  const [loading, setLoading] = useState(false);
  const [certList, setCertList] = useState([]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const fetchCertificateList = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/certificate/list", {
        params: { studentSeq: seq },
      });
      console.log("Certificate response:", res.data);
      setCertList(res.data || []); // null이면 빈 배열로 설정
    } catch (error) {
      console.error("자격증 정보 조회 실패:", error);
      setCertList([]); // 에러 발생해도 빈 배열 유지
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seq) {
      fetchCertificateList();
    }
  }, [seq]);

  if (loading) {
    return <p className="loading-text">로딩 중...</p>;
  }

  // 만약 certList가 빈 배열인 경우 기본 화면 대신 안내 메시지를 표시할 수도 있습니다.
  if (!Array.isArray(certList) || certList.length === 0) {
    return (
      <div className="info-container">
        <h2>자격증 정보</h2>
        <p className="error-text">등록된 자격증 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="info-container">
      <h2>자격증 정보</h2>
      <table className="info-table">
        <thead>
          <tr>
            <th>자격증명</th>
            <th>자격증번호</th>
            <th>합격일자</th>
            <th>발급기관</th>
          </tr>
        </thead>
        <tbody>
          {certList.map((item, index) => (
            <tr key={index}>
              <td>{item.certName}</td>
              <td>{item.certNo}</td>
              <td>{formatDate(item.passDt)}</td>
              <td>{item.issuer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Certificate;
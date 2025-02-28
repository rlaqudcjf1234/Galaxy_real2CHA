// Aftercare.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// 내부 API 호출: 인증이 필요한 요청은 authenticatedRequest를 axios2로 사용
import { authenticatedRequest as axios2 } from "../../plugins/axios";
// 외부 API 호출: 기본 axios 사용 (withCredentials 기본값 false)
import axios from "axios";
import "../../css/aftercare/AftercareInfo.css";

const Aftercare = ({ hideEditButton = false }) => {
  const { seq } = useParams();

  // 사후관리 데이터, 로딩 상태, 수정 모드 여부 state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // 폼 데이터 state
  const [form, setForm] = useState({
    employmentHope: "",
    companyLevel: "",
    companyType: "",
    companyNation: "",
    companyLocation: "",
    earlyEmployment: "",
    generalEmployment: ""
  });

  // CODE 옵션 state
  const [codeOptions, setCodeOptions] = useState([]);

  // 국가 옵션 state (외교부 국가표준코드 API)
  const [countryOptions, setCountryOptions] = useState([]);
  const [showCountryModal, setShowCountryModal] = useState(false);

  // 근무지역 모달 (Nominatim) state
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationResults, setLocationResults] = useState([]);

  // 1) 사후관리 데이터 조회 (내부 API → 인증 필요: axios2 사용)
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios2.get(`/api/aftercare/read/${seq}`);
      if (res.data && res.data.studentSeq) {
        setData(res.data);
        setForm({
          employmentHope: res.data.employmentHope || "",
          companyLevel: res.data.companyLevel || "",
          companyType: res.data.companyType || "",
          companyNation: res.data.companyNation || "",
          companyLocation: res.data.companyLocation || "",
          earlyEmployment: res.data.earlyEmployment || "",
          generalEmployment: res.data.generalEmployment || ""
        });
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("사후관리 조회 실패:", error);
      alert("사후관리 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  // 2) CODE 옵션 조회 (내부 API → 인증 필요: axios2 사용)
  const fetchCodeOptions = async () => {
    try {
      const res = await axios2.get("/api/code/use", { params: { text: "companyLevel" } });
      if (res.data && res.data.length > 0) {
        // res.data[0].value에 그룹ID 5에 해당하는 CODE 리스트가 있다고 가정합니다.
        setCodeOptions(res.data[0].value);
      }
    } catch (error) {
      console.error("CODE 옵션 불러오기 실패:", error);
    }
  };

  // 3) 국가 옵션 조회 (외부 API → 인증 불필요: 기본 axios 사용)
  const fetchCountryOptions = async () => {
    try {
      const res = await axios.get(
        "https://api.odcloud.kr/api/15091117/v1/uddi:f340c326-d04c-43ab-bd1a-a3caf2c273e3",
        {
          params: {
            page: 1,
            perPage: 1000,
            returnType: "JSON",
            serviceKey:
              "CEa9v08faItkZF4galNtASFflUgJLh27jOphH5S94dC0K3Sw4z4TNOp0oKrlSHf/Due8/qW9HWW6T9OsTkx/9g=="
          }
        }
      );
      if (res.data && res.data.data) {
        setCountryOptions(res.data.data);
      }
    } catch (error) {
      console.error("국가코드 불러오기 실패:", error);
    }
  };

  // 4) 근무지역 검색 (Nominatim API → 외부 API: 기본 axios 사용)
  const searchLocation = async () => {
    if (!locationQuery.trim()) {
      alert("검색어를 입력하세요.");
      return;
    }
    try {
      const res = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: locationQuery.trim(),
          format: "jsonv2",
          limit: 10,
          addressdetails: 1
        }
      });
      setLocationResults(res.data);
    } catch (error) {
      console.error("근무지역 검색 실패:", error);
    }
  };

  // useEffect: 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    fetchData();
    fetchCodeOptions();
    fetchCountryOptions();
  }, [seq]);

  // 5) 사후관리 생성 (내부 API → 인증 필요: axios2 사용)
  const handleCreate = async () => {
    try {
      await axios2.post("/api/aftercare/create", { studentSeq: seq });
      alert("사후관리 생성 완료");
      fetchData();
    } catch (error) {
      console.error("사후관리 생성 실패:", error);
      alert("사후관리 생성 실패");
    }
  };

  // 6) 사후관리 수정 (내부 API → 인증 필요: axios2 사용)
  const handleUpdate = async () => {
    try {
      await axios2.put("/api/aftercare/update", {
        studentSeq: seq,
        employmentHope: form.employmentHope,
        companyLevel: form.companyLevel,
        companyType: form.companyType,
        companyNation: form.companyNation,
        companyLocation: form.companyLocation,
        earlyEmployment: form.earlyEmployment,
        generalEmployment: form.generalEmployment
      });
      alert("사후관리 수정 완료");
      setEditMode(false);
      fetchData();
    } catch (error) {
      console.error("사후관리 수정 실패:", error);
      alert("사후관리 수정 실패");
    }
  };

  // 입력 필드 변경 처리
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 수정 모드 취소
  const handleCancel = () => {
    setForm({
      employmentHope: data.employmentHope || "",
      companyLevel: data.companyLevel || "",
      companyType: data.companyType || "",
      companyNation: data.companyNation || "",
      companyLocation: data.companyLocation || "",
      earlyEmployment: data.earlyEmployment || "",
      generalEmployment: data.generalEmployment || ""
    });
    setEditMode(false);
  };

  if (loading) return <p>로딩 중...</p>;

  if (!data) {
    return (
      <div className="info-container">
        <h2>사후관리</h2>
        <p>사후관리 데이터가 없습니다. 새로 생성해주세요.</p>
        <button onClick={handleCreate} className="button-aftercare">
          사후관리 생성
        </button>
      </div>
    );
  }

  return (
    <div className="info-container">
      <h2>사후관리</h2>
      <div className="info-grid">
        <div className="info-box">
          <strong>학생 이름</strong>
          <span>{data.studentName}</span>
        </div>
        <div className="info-box">
          <strong>이메일</strong>
          <span>{data.email}</span>
        </div>
        <div className="info-box">
          <strong>강의명</strong>
          <span>{data.lectureName}</span>
        </div>
        <div className="info-box">
          <strong>담당 교수 (CLASS)</strong>
          <span>{data.adminName}</span>
        </div>
      </div>

      {editMode ? (
        <>
          <div className="info-grid" style={{ marginTop: "20px" }}>
            <div className="info-box">
              <strong>취업 희망 여부</strong>
              <select name="employmentHope" value={form.employmentHope} onChange={handleChange}>
                <option value="">선택</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
            <div className="info-box">
              <strong>회사 규모</strong>
              <select name="companyLevel" value={form.companyLevel} onChange={handleChange}>
                <option value="">선택</option>
                {codeOptions.map((option) => (
                  <option key={option.CODE_ID} value={option.CODE_NAME}>
                    {option.CODE_NAME}
                  </option>
                ))}
              </select>
            </div>
            <div className="info-box">
              <strong>회사 업종</strong>
              <input type="text" name="companyType" value={form.companyType} onChange={handleChange} />
            </div>
            <div className="info-box">
              <strong>회사 국적</strong>
              <div className="country-select" onClick={() => setShowCountryModal(true)}>
                {form.companyNation || "선택"}
              </div>
            </div>
            <div className="info-box">
              <strong>근무지역</strong>
              <div className="country-select" onClick={() => setShowLocationModal(true)}>
                {form.companyLocation || "선택"}
              </div>
            </div>
            <div className="info-box">
              <strong>조기취업 여부</strong>
              <select name="earlyEmployment" value={form.earlyEmployment} onChange={handleChange}>
                <option value="">선택</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
            <div className="info-box">
              <strong>취업 여부(수료 후 6개월 이내)</strong>
              <select name="generalEmployment" value={form.generalEmployment} onChange={handleChange}>
                <option value="">선택</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
              </select>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button className="button-update-complete" onClick={handleUpdate}>
              수정 완료
            </button>
            <button className="button-cancel" onClick={handleCancel} style={{ marginLeft: "10px" }}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="info-grid" style={{ marginTop: "20px" }}>
            <div className="info-box">
              <strong>취업 희망 여부</strong>
              <span>{form.employmentHope}</span>
            </div>
            <div className="info-box">
              <strong>회사 규모</strong>
              <span>{form.companyLevel}</span>
            </div>
            <div className="info-box">
              <strong>회사 업종</strong>
              <span>{form.companyType}</span>
            </div>
            <div className="info-box">
              <strong>회사 국적</strong>
              <span>{form.companyNation}</span>
            </div>
            <div className="info-box">
              <strong>근무지역</strong>
              <span>{form.companyLocation}</span>
            </div>
            <div className="info-box">
              <strong>조기취업 여부</strong>
              <span>{form.earlyEmployment}</span>
            </div>
            <div className="info-box">
              <strong>취업 여부(수료 후 6개월 이내)</strong>
              <span>{form.generalEmployment}</span>
            </div>
          </div>
          {/* 일반 READ 페이지에서는 수정 버튼을 보여줌 */}
          {!hideEditButton && (
            <div style={{ marginTop: "20px" }}>
              <button className="button-update" onClick={() => setEditMode(true)}>
                수정
              </button>
            </div>
          )}
        </>
      )}

      {/* 회사 국적 모달 */}
      {showCountryModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>국가 선택</h3>
              <button className="modal-close" onClick={() => setShowCountryModal(false)}>
                X
              </button>
            </div>
            <div className="modal-body">
              <ul>
                {countryOptions.map((country, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setForm({ ...form, companyNation: country["한글명"] });
                      setShowCountryModal(false);
                    }}
                  >
                    {country["한글명"]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 근무지역 모달 (Nominatim) */}
      {showLocationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>근무지역 검색</h3>
              <button className="modal-close" onClick={() => setShowLocationModal(false)}>
                X
              </button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="예: London, Tokyo, 대한민국"
                  style={{ width: "70%", marginRight: "10px", padding: "6px" }}
                />
                <button onClick={searchLocation} className="modal-search-button">검색</button>
              </div>
              <ul>
                {locationResults.map((loc, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setForm({ ...form, companyLocation: loc.display_name });
                      setShowLocationModal(false);
                    }}
                  >
                    {loc.display_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aftercare;

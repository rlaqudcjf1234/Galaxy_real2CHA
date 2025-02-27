import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function ApplyRead() {
    const [apply, setApply] = useState(null);
    const [classInfo, setClassInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Redux store에서 액세스 토큰 가져오기
    const accessToken = useSelector((state) => state.accessToken.val);

    const fetchData = async () => {
        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            const applyResponse = await axios.get(`/api/apply/read/${id}`);
            console.log("Apply 응답 데이터:", applyResponse.data);

            const classData = {
                seq: applyResponse.data.seq,
                round: applyResponse.data.ROUND,
                lecture_name: applyResponse.data.LECTURE_NAME,
                start_dt: applyResponse.data.START_DT,
                end_dt: applyResponse.data.END_DT,
            };

            setApply(applyResponse.data);
            setClassInfo(classData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.response?.data?.message || "정보를 불러오는데 실패했습니다.");

            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/api/apply/delete/${id}`);
            if (response.status === 200) {
                alert("성공적으로 삭제되었습니다.");
                navigate("/apply");
            }
        } catch (error) {
            console.error("Error:", error);
            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleApprove = async () => {
        try {
            const response = await axios.post("/api/apply/approve", { id: id });
            if (response.data && response.data.message) {
                alert(response.data.message);
            } else {
                alert("승인이 완료되었습니다.");
            }
            fetchData();
        } catch (error) {
            console.error("승인 처리 중 오류:", error);
            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }
            const errorMessage = error.response?.data?.message || "승인 처리 중 오류가 발생했습니다.";
            alert(errorMessage);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, accessToken]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!apply) return <div>등록 정보를 찾을 수 없습니다.</div>;

    // 버튼 공통 스타일
    const buttonStyle = { minWidth: "58px", minHeight: "38px"};
    const buttonStyle1 = { minWidth: "90px", minHeight: "38px"};

    return (
        <div>
            <table className="table">
                <caption>
                    <strong>수강생 상세정보</strong>
                </caption>
                <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">강의</th>
                        <td>
                            {classInfo
                                ? `${classInfo.round}회 - ${classInfo.lecture_name}`
                                : "정보 없음"}
                        </td>
                        <th scope="row">교육 기간</th>
                        <td>
                            {classInfo
                                ? `${classInfo.start_dt} ~ ${classInfo.end_dt}`
                                : "정보 없음"}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">학생명</th>
                        <td>{apply.NAME}</td>
                        <th scope="row">주민등록번호</th>
                        <td>{apply.JUMIN}</td>
                    </tr>
                    <tr>
                        <th scope="row">전화번호</th>
                        <td>{apply.PHONE}</td>
                        <th scope="row">이메일</th>
                        <td>{apply.EMAIL}</td>
                    </tr>
                    <tr>
                        <th scope="row">실거주지</th>
                        <td>
                            {apply.REAL_ZIPCODE} {apply.REAL_ADDRESS1} {apply.REAL_ADDRESS2}
                        </td>
                        <th scope="row">등본상 주소</th>
                        <td>
                            {apply.ZIPCODE} {apply.ADDRESS1} {apply.ADDRESS2}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">지원경로</th>
                        <td>{apply.PATH}</td>
                        <th scope="row">등록일자</th>
                        <td>{apply.REG_DT}</td>
                    </tr>
                    <tr>
                        <th scope="row">승인상태</th>
                        <td>{apply.USE_YN === "Y" ? "승인완료" : "승인대기"}</td>
                        <th scope="row"></th>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            {/* 버튼을 두 번째 스샷처럼 가로로 배치, 간격 확보 */}
                            <div className="d-flex justify-content-center mt-3">
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate(-1)}
                                        style={buttonStyle}
                                    >
                                        목록
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(id)}
                                        style={buttonStyle1}
                                    >
                                        신청 취소
                                    </button>
                                    {apply.USE_YN !== "Y" && (
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleApprove}
                                            style={buttonStyle}
                                        >
                                            승인
                                        </button>
                                    )}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ApplyRead;

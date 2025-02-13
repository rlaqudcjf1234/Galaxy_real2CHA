import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ApplyDelete from "./ApplyDelete";
import ApplyApprove from "./ApplyApprove";

function ApplyRead() {
    const [apply, setApply] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchApply = async () => {
        if (!id || id === "undefined") {
            console.error("Invalid ID");
            navigate("/apply");
            return;
        }
        try {
            const response = await axios.get(`/api/apply/read/${id}`);
            setApply(response.data);
        } catch (error) {
            console.error("Error fetching apply info:", error);
            alert("등록 정보를 불러오는데 실패했습니다.");
            navigate("/apply");
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
            fetchApply(); // 데이터 새로고침
        } catch (error) {
            console.error("승인 처리 중 오류:", error);
            const errorMessage = error.response?.data?.message || "승인 처리 중 오류가 발생했습니다.";
            alert(errorMessage);
        }
    };

    useEffect(() => {
        fetchApply();
    }, [id]);

    if (loading) return <div>로딩중...</div>;
    if (!apply) return <div>등록 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="apply-detail-container">
            <div className="apply-detail-wrapper">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>상세정보</h3>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <span>승인상태: {apply.USE_YN === "Y" ? "승인완료" : "승인대기"}</span>
                        {apply.USE_YN !== "Y" && ( // 'N' 대신 'Y'가 아닐 때로 조건 변경
                            <ApplyApprove onApprove={handleApprove} itemId={id} />
                        )}
                        <ApplyDelete onDelete={handleDelete} itemId={id}>
                            신청 취소
                        </ApplyDelete>
                    </div>
                </div>

                <div className="detail-content">
                    <div className="detail-row">
                        <label>반 명: </label>
                        <span>{apply.SEQ}</span>
                    </div>
                    <div className="detail-row">
                        <label>학생명: </label>
                        <span>{apply.NAME}</span>
                    </div>
                    <div className="detail-row">
                        <label>주민등록번호: </label>
                        <span>{apply.JUMIN}</span>
                    </div>
                    <div className="detail-row">
                        <label>전화번호: </label>
                        <span>{apply.PHONE}</span>
                    </div>
                    <div className="detail-row">
                        <label>이메일: </label>
                        <span>{apply.EMAIL}</span>
                    </div>
                    <div className="detail-row">
                        <label>실거주지: </label>
                        <span>
                            {apply.REAL_ZIPCODE} | {apply.REAL_ADDRESS1}, {apply.REAL_ADDRESS2}
                        </span>
                    </div>
                    <div className="detail-row">
                        <label>등본상 주소: </label>
                        <span>
                            {apply.ZIPCODE} | {apply.ADDRESS1}, {apply.ADDRESS2}
                        </span>
                    </div>
                    <div className="detail-row">
                        <label>지원경로: </label>
                        <span>{apply.PATH}</span>
                    </div>
                    <div className="detail-row">
                        <label>등록일자: </label>
                        <span>{apply.REG_DT}</span>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: "20px",
                        padding: "20px 0",
                        borderTop: "1px solid #eee",
                        textAlign: "center",
                    }}
                >
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: "6px 12px",
                            backgroundColor: "#6c757d",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        목록으로
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApplyRead;

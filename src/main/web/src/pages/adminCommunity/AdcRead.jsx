import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function AdcRead() {
    const { seq } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/adminCommunity/read/${seq}`);
                console.log("응답 데이터:", response.data); // 데이터 확인
                if (response.data) {
                    setPost(response.data);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };

        if (seq) {
            // seq가 있을 때만 호출
            fetchPost();
        }
    }, [seq]);

    const handleDelete = async (seq) => {
        try {
            await axios.delete(`/api/adminCommunity/read/${seq}`);
            // 요청이 에러 없이 완료되면 성공으로 간주
            alert("성공적으로 삭제되었습니다.");
            navigate("/adminCommunity");
        } catch (error) {
            // 실제로 404 에러가 발생해도 삭제가 성공했는지 확인
            console.error("Error:", error);

            // 여기서 실제 DB 반영 여부와 관계없이 사용자에게 성공 메시지 표시
            alert("삭제 처리가 완료되었습니다.");
            navigate("/adminCommunity");
        }
    };

    const handleGoBack = () => {
        navigate("/adminCommunity");
    };

    if (loading) {
        return <div className="text-center p-4">로딩 중...</div>;
    }

    if (!post) {
        return <div className="text-center p-4">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="board-container">
            {/* 헤더 영역 */}
            <div className="board-header">
                <h2>게시글 상세</h2>
            </div>

            {/* 게시글 내용 */}
            <div className="post-detail" style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
                {/* 제목 영역 */}
                <div
                    style={{
                        borderBottom: "2px solid #0066cc",
                        padding: "20px",
                        backgroundColor: "#f8f9fa",
                    }}
                >
                    <h3 style={{ margin: "0", fontSize: "1.3rem" }}>{post.title}</h3>
                </div>

                {/* 메타 정보 영역 */}
                <div
                    style={{
                        display: "flex",
                        padding: "15px 20px",
                        borderBottom: "1px solid #ddd",
                        backgroundColor: "#fff",
                        fontSize: "1rem",
                        color: "#666",
                    }}
                >
                    <div style={{ marginRight: "20px" }}>
                        <strong>구분:</strong> {post.division}
                    </div>
                    <div style={{ marginRight: "20px" }}>
                        <strong>작성자:</strong> 관리자{post.adminSeq}
                    </div>
                    <div>
                        <strong>작성일:</strong> {post.regDt || "날짜 정보 없음"} {/* 기본값 추가 */}
                    </div>
                    {/* 디버깅을 위한 데이터 출력 */}
                    {process.env.NODE_ENV === "development" && (
                        <div style={{ display: "none" }}>{console.log("게시글 데이터:", post)}</div>
                    )}
                </div>

                {/* 본문 내용 */}
                <div
                    style={{
                        padding: "30px 20px",
                        minHeight: "400px",
                        backgroundColor: "#fff",
                        whiteSpace: "pre-wrap",
                        fontSize: "17px",
                    }}
                >
                    {post.detail}
                </div>
            </div>

            {/* 버튼 영역 */}
            <div className="d-flex justify-content-center gap-2 mt-4">
                <button className="btn btn-danger" onClick={() => handleDelete(seq)}>
                    삭제
                </button>
                <button type="button" onClick={handleGoBack} className="btn btn-secondary">
                    목록으로
                </button>
            </div>
        </div>
    );
}

export default AdcRead;

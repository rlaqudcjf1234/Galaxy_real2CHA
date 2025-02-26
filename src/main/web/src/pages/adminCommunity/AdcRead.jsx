import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function AdcRead() {
    const { seq } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Redux store에서 액세스 토큰 가져오기
    const accessToken = useSelector((state) => state.accessToken.val);

    useEffect(() => {
        const fetchPost = async () => {
            if (!accessToken) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(`/api/adminCommunity/read/${seq}`);
                console.log("응답 데이터:", response.data);
                if (response.data) {
                    setPost(response.data);
                }
            } catch (error) {
                console.error("Error:", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                    return;
                }
                setError(error.response?.data?.message || "게시글을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        if (seq) {
            fetchPost();
        }
    }, [seq, accessToken, navigate]);

    const handleDelete = async (seq) => {
        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            await axios.delete(`/api/adminCommunity/read/${seq}`);
            alert("성공적으로 삭제되었습니다.");
            navigate("/adminCommunity");
        } catch (error) {
            console.error("Error:", error);

            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }

            // 여기서는 실제 에러 처리를 하되, 특정 조건에서만 성공으로 처리
            if (error.response?.status === 404) {
                alert("삭제 처리가 완료되었습니다.");
                navigate("/adminCommunity");
            } else {
                alert(error.response?.data?.message || "삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const handleGoBack = () => {
        navigate("/adminCommunity");
    };

    if (loading) {
        return <div className="text-center p-4">로딩 중...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!post) {
        return <div className="text-center p-4">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>게시글 상세</h2>
            </div>

            <div className="post-detail" style={{ border: "1px solid #ddd", borderRadius: "4px" }}>
                <div
                    style={{
                        borderBottom: "2px solid #0066cc",
                        padding: "20px",
                        backgroundColor: "#f8f9fa",
                    }}
                >
                    <h3 style={{ margin: "0", fontSize: "1.3rem" }}>{post.title}</h3>
                </div>

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
                        <strong>작성자:</strong> {post.name}
                    </div>
                    <div>
                        <strong>작성일:</strong> {post.regDt || "날짜 정보 없음"}
                    </div>
                </div>

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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function AdcAdd() {
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.accessToken.val);

    const [formData, setFormData] = useState({
        adminSeq: null, // 초기값은 null로 설정
        title: "",
        division: "",
        detail: "",
    });

    // 사용자 정보 불러오기
    const fetchUserInfo = async () => {
        try {
            const response = await axios.get("/api/adminCommunity/user-info");

            if (response.status === 200 && response.data) {
                console.log("서버에서 받은 사용자 정보:", response.data);
                setFormData((prev) => ({
                    ...prev,
                    adminSeq: response.data.seq, // 사용자 ID 설정
                }));
            }
        } catch (error) {
            console.error("사용자 정보 조회 실패:", error);
            alert("사용자 정보를 가져오는 데 실패했습니다. 다시 로그인해 주세요.");
            navigate("/login");
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchUserInfo();
        } else {
            navigate("/login");
        }
    }, [accessToken, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.adminSeq) {
            alert("관리자 정보가 없습니다. 다시 로그인해 주세요.");
            return;
        }

        try {
            const response = await axios.post("/api/adminCommunity/add", formData);

            if (response.status === 200) {
                alert("게시글이 성공적으로 등록되었습니다.");
                navigate("/adminCommunity");
            }
        } catch (error) {
            console.error("게시글 등록 실패:", error);
            alert(error.response?.data?.message || "게시글 등록 중 오류가 발생했습니다.");
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>게시글 작성</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <table className="board-table">
                    <tbody>
                        <tr>
                            <th>구분</th>
                            <td>
                                <select
                                    name="division"
                                    value={formData.division}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    style={{ width: "200px" }}
                                    required
                                >
                                    <option value="">선택해주세요</option>
                                    <option value="공지">공지</option>
                                    <option value="일반">일반</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="제목을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td>
                                <textarea
                                    name="detail"
                                    value={formData.detail}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    rows="10"
                                    placeholder="내용을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="button" onClick={handleGoBack} className="btn btn-secondary">
                        이전으로
                    </button>
                    <button type="submit" className="btn btn-primary">
                        등록하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdcAdd;

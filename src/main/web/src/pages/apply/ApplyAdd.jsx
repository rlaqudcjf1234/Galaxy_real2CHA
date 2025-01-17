import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function ApplyAdd() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        adminSeq: 1,
        title: "",
        division: "",
        detail: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("서버로 보내는 데이터:", formData);

        try {
            const response = await axios.post("/api/apply/add", formData);
            if (response.status === 200) {
                alert("당신의 정보가 정상적으로 등록되었습니다.");
                navigate("/adminCommunity");
            }
        } catch (error) {
            alert(error.response?.data || "정보 등록 중 오류가 발생했습니다.");
        }
    };

    // 이전 페이지로 가기 처리
    const handleGoBack = () => {
        navigate(-1); // 브라우저의 이전 페이지로 이동
    };

    return (
        <div className="board-container">
            {/* 헤더 영역 */}
            <div className="board-header">
                <h2>정보 작성</h2>
            </div>

            {/* 폼 영역 */}
            <form onSubmit={handleSubmit}>
                <table className="board-table">
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="이름을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>주민등록번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="jumin"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="주민등록번호를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>실거주 우편번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_zipzode"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주지의 우편번호를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>실거주 주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_address1"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주 주소를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>실거주 상세 주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_address2"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주지의 상세 주소를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>우편번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="등본상 우편번호를 입력해주세요"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>등본상 주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="address1"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="등본상 상세 주소를 입력해주세요"
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="이메일을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>휴대전화</th>
                            <td>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="전화번호를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>지원경로</th>
                            <td>
                                <input
                                    type="text"
                                    name="path"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="지원경로를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 버튼 영역 */}
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

export default ApplyAdd;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import CryptoJS from "crypto-js";

function ApplyAdd() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("/api/class/list");
                // response.data가 배열인지 확인
                const classData = Array.isArray(response.data) ? response.data : [];
                setClasses(classData);
            } catch (error) {
                console.error("Error fetching classes:", error);
                setClasses([]); // 에러 시 빈 배열로 설정
            }
        };
        fetchClasses();
    }, []);

    const [formData, setFormData] = useState({
        class_seq: 0,
        name: "",
        jumin: "",
        real_zipcode: "",
        real_address1: "",
        real_address2: "",
        zipcode: "",
        address1: "",
        address2: "",
        email: "",
        phone: "",
        path: "",
    });

    // // 주민번호 암호화 함수
    // const encryptJumin = (juminNumber) => {
    //     const secretKey = process.env.REACT_APP_JUMIN_SECRET_KEY; // 환경변수에서 키 가져오기
    //     return CryptoJS.AES.encrypt(juminNumber, secretKey).toString();
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "class_seq" ? parseInt(value) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("class_seq value:", formData.class_seq);
        console.log("class_seq type:", typeof formData.class_seq);
        try {
            const submitData = {
                ...formData,
                class_seq: Number(formData.class_seq),
            };
            console.log("submitData:", submitData);
            console.log("class_seq type:", typeof submitData.class_seq);

            const response = await axios.post("/api/apply/add", submitData);
            if (response.status === 200) {
                alert("정보가 정상적으로 등록되었습니다.");
                navigate("/apply");
            }
        } catch (error) {
            console.error("상세 에러:", error.response?.data);
            alert("등록 실패: " + (error.response?.data?.message || "서버 오류가 발생했습니다."));
        }
    };
    // //주민등록번호 암호화()
    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // 데이터 유효성 검사
    //     if (!formData.jumin) {
    //         alert("주민등록번호를 입력해주세요.");
    //         return;
    //     }

    //     try {
    //         // 주민번호 암호화
    //         const encryptedData = {
    //             ...formData,
    //             jumin: encryptJumin(formData.jumin)
    //         };

    //         console.log("서버로 보내는 데이터:", encryptedData);

    //         const response = await axios.post("/api/apply/add", encryptedData);
    //         if (response.status === 200) {
    //             alert("당신의 정보가 정상적으로 등록되었습니다.");
    //             navigate("/adminCommunity");
    //         }
    //     } catch (error) {
    //         alert(error.response?.data || "정보 등록 중 오류가 발생했습니다.");
    //     }
    // };

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
                        <tr id="apply_title">
                            <th>반(미정)</th>
                            <td>
                                <select
                                    name="class_seq"
                                    value={formData.class_seq}
                                    defaultValue={0}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">클래스를 선택하세요</option>
                                    <option value={1}>1기 - A반 (2024-01-01 ~ 2024-06-30)</option>
                                    <option value={2}>1기 - B반 (2024-01-01 ~ 2024-06-30)</option>
                                    <option value={3}>2기 - A반 (2024-07-01 ~ 2024-12-31)</option>
                                    {/* <option value="">클래스를 선택하세요</option>
                                    {Array.isArray(classes) &&
                                        classes.map((classItem) => (
                                            <option key={classItem.seq} value={classItem.seq}>
                                                {classItem.round} - {classItem.room} ({classItem.start_date} ~{" "}
                                                {classItem.end_date})
                                            </option>
                                        ))} */}
                                </select>
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>이름</th>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="이름을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>주민등록번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="jumin"
                                    value={formData.jumin}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="주민등록번호를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>실거주 우편번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_zipcode"
                                    value={formData.real_zipcode}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주지의 우편번호를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>실거주 주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_address1"
                                    value={formData.real_address1}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주 주소를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>실거주 상세 주소</th>
                            <td>
                                <input
                                    type="text"
                                    name="real_address2"
                                    value={formData.real_address2}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="실거주지의 상세 주소를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>우편번호</th>
                            <td>
                                <input
                                    type="text"
                                    name="zipcode"
                                    value={formData.zipcode}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="등본상 우편번호를 입력해주세요"
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>등본상 주소(선택)</th>
                            <td>
                                <input
                                    type="text"
                                    name="address1"
                                    value={formData.address1}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="등본상 주소를 입력해주세요"
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>등본상 상세 주소(선택)</th>
                            <td>
                                <input
                                    type="text"
                                    name="address2"
                                    value={formData.address2}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="등본상 상세 주소를 입력해주세요"
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>이메일</th>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="이메일을 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>휴대전화</th>
                            <td>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    placeholder="전화번호를 입력해주세요"
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>지원경로</th>
                            <td>
                                <input
                                    type="text"
                                    name="path"
                                    value={formData.path}
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

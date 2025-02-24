import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Community.css";

function ApplyAdd() {
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.accessToken.val);
    const [classes, setClasses] = useState([]);

    // Daum 우편번호 스크립트 로드
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        // 토큰 체크 추가
        if (!accessToken) {
            navigate("/login");
            return;
        }

        const fetchClasses = async () => {
            try {
                const response = await axios.get("/api/class/list");
                const classData = response.data.items.map((item) => ({
                    seq: item.SEQ,
                    round: item.ROUND,
                    lecture_name: item.LECTURE_NAME,
                    start_dt: item.START_DT,
                }));
                setClasses(classData);
            } catch (error) {
                console.error("Error fetching classes:", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                    return;
                }
                setClasses([]);
            }
        };
        fetchClasses();
    }, [accessToken, navigate]);

    const [formData, setFormData] = useState({
        seq: "",
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "jumin") {
            // 숫자만 입력 가능하도록
            const numbersOnly = value.replace(/[^0-9]/g, "");
            // 최대 13자리로 제한
            const formatted = numbersOnly.slice(0, 13);

            setFormData((prev) => ({
                ...prev,
                [name]: formatted,
            }));
        } else if (name === "phone") {
            // 숫자만 입력 가능하도록
            const numbersOnly = value.replace(/[^0-9]/g, "");
            // 최대 11자리로 제한
            const formatted = numbersOnly.slice(0, 11);

            setFormData((prev) => ({
                ...prev,
                [name]: formatted,
            }));
        } else if (name === "seq") {
            setFormData((prev) => ({
                ...prev,
                [name]: parseInt(value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // 실거주지 주소 검색
    const searchRealAddress = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    setFormData((prev) => ({
                        ...prev,
                        real_zipcode: data.zonecode,
                        real_address1: data.address,
                    }));
                },
            }).open();
        } else {
            alert("우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        }
    };

    // 등본상 주소 검색
    const searchAddress = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    setFormData((prev) => ({
                        ...prev,
                        zipcode: data.zonecode,
                        address1: data.address,
                    }));
                },
            }).open();
        } else {
            alert("우편번호 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!accessToken) {
            navigate("/login");
            return;
        }

        try {
            const submitData = {
                ...formData,
                class_seq: Number(formData.seq),
                seq: undefined,
            };
            const response = await axios.post("/api/apply/add", submitData);
            if (response.status === 200) {
                alert("정보가 정상적으로 등록되었습니다.");
                navigate("/apply");
            }
        } catch (error) {
            console.error("상세 에러:", error.response?.data);
            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }
            alert("등록 실패: " + (error.response?.data?.message || "서버 오류가 발생했습니다."));
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="board-container">
            <div className="board-header">
                <h2>정보 작성</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <table className="board-table">
                    <tbody>
                        <tr id="apply_title">
                            <th>반</th>
                            <td>
                                <select
                                    name="seq"
                                    value={formData.seq}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option value="">클래스를 선택하세요</option>
                                    {classes && classes.length > 0 ? (
                                        classes.map((classItem) => (
                                            <option key={classItem.seq} value={classItem.seq}>
                                                {classItem.round}기 - {classItem.lecture_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            클래스 정보를 불러오는 중...
                                        </option>
                                    )}
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
                                    placeholder=" '-' 외외 주민등록번호 13자리를 입력해주세요"
                                    maxLength={13}
                                    required
                                />
                            </td>
                        </tr>
                        <tr id="apply_title">
                            <th>실거주 우편번호</th>
                            <td>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="real_zipcode"
                                        value={formData.real_zipcode}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="실거주지의 우편번호"
                                        readOnly
                                        required
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={searchRealAddress}>
                                        우편번호 검색
                                    </button>
                                </div>
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
                                    placeholder="실거주 주소"
                                    readOnly
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
                            <th>우편번호(선택)</th>
                            <td>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        name="zipcode"
                                        value={formData.zipcode}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        placeholder="등본상 우편번호"
                                        readOnly
                                    />
                                    <button type="button" className="btn btn-secondary" onClick={searchAddress}>
                                        우편번호 검색
                                    </button>
                                </div>
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
                                    placeholder="등본상 주소"
                                    readOnly
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
                                    placeholder=" '-' 외 전화번호 11자리를 입력해주세요"
                                    maxLength={11}
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

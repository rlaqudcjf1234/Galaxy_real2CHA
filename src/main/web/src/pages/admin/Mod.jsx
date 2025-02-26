import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { authenticatedRequest as axios } from '../../plugins/axios';

function Mod() {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({ use_yn: [], division: [] });
    const [admin, setAdmin] = useState({});
    const [errors, setErrors] = useState({});

    const params = useParams();
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "text": "adminMod"
                }
            });
            const data = {}
            response
                .data
                .forEach(item => {
                    data[item.name] = item.value
                });
            setCodes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/admin/read", {
                params: {
                    seq: params.seq
                }
            });
            setAdmin(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
        fetchFormData();
    }, []);

    const handleFormData = (e) => {
        setAdmin({
            ...admin,
            [
                e
                    .target
                    .name
                    .toUpperCase()
            ]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/admin/mod", formData);
            navigate("/admin");
        } catch (error) {
            const response = error.response;
            if (response && response.data) {
                setErrors(response.data)
            }
        } finally {
            setLoading(false);
        }
    }

    const handlePreview = () => {
        window.open(`/admin/pass/${admin.SEQ}`, "mozillaWindow", "popup");
    }

    return (
        <div>
            {/* <div className="board-header">
                <div className="search-box"></div>
                <a className="write-button" onClick={handlePreview}>비밀번호 변경</a>
            </div> */
            }
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="seq" value={admin.SEQ} readOnly="readOnly" />
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <em>홈</em>
                            <strong>강사현황</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%" />
                        <col />
                        <col width="30%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input
                                    type="email"
                                    className="form-control-plaintext"
                                    name="email"
                                    value={admin.EMAIL}
                                    readOnly="readOnly" />
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={admin.NAME}
                                    onChange={handleFormData}
                                    required="required" />
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.name}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>연락처</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={admin.PHONE}
                                    onChange={handleFormData} />
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.phone}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>구분</th>
                            <td>
                                <select
                                    name="division"
                                    className="form-control"
                                    value={admin.DIVISION}
                                    onChange={handleFormData}
                                    required="required">
                                    <option value="">선택</option>
                                    {
                                        codes
                                            .division
                                            .map(
                                                (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                            )
                                    }
                                </select>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.division}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>등록일자</th>
                            <td colSpan="2">
                                <input
                                    type="text"
                                    className="form-control-plaintext"
                                    name="reg_dt"
                                    value={admin.REG_DT}
                                    readOnly="readOnly" />
                            </td>
                        </tr>
                        <tr>
                            <th>사용여부</th>
                            <td>
                                <select
                                    name="use_yn"
                                    className="form-select"
                                    value={admin.USE_YN}
                                    onChange={handleFormData}
                                    required="required">
                                    <option value="">선택</option>
                                    {
                                        codes
                                            .use_yn
                                            .map(
                                                (item) => (<option key={item.CODE_ID} value={item.CODE_ID}>{item.CODE_NAME}</option>)
                                            )
                                    }
                                </select>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.use_yn}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">저장</button>
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default Mod;
import {useEffect, useState} from "react"
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const navigate = useNavigate();

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    const [codes, setCodes] = useState({division: []});
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: {
                    "text": "adminAdd"
                }
            });
            response
                .data
                .forEach(item => {
                    setCodes({
                        ...codes,
                        [item.name]: item.value
                    });
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchCodes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/admin/add", formData);
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className="table">
                    {/* 헤더 영역 */}
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>강사현황</em>
                            <strong>강사등록</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%"/>
                        <col/>
                        <col width="30%"/>
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="name@example.com"
                                    required="required"/>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    required="required"/>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.password}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password2"
                                    required="required"/>
                            </td>
                            <td>
                                <div className="invalid-feedback">
                                    {errors.password2}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>성명</th>
                            <td>
                                <input type="text" className="form-control" name="name" required="required"/>
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
                                <input type="text" className="form-control" name="phone"/>
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
                                    defaultValue=""
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
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">등록</button>
                    <button type="button" className="btn btn-secondary" onClick={handleHistoryBack}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default Add;
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        group_name: ''
    });

    /** 뒤로가기 */
    const handleHistoryBack = () => {
        navigate(-1);
    }

    // 입력 값 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {            
            const response = await axios.post("/api/code/add", formData);
            navigate("/group");
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
                    <caption>
                        <span>
                            <em>홈</em>                            
                            <strong>코드그룹</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="20%" />
                        <col width="80%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>그룹명</th>
                            <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="group_name"
                                    value={formData.group_name}
                                    onChange={handleChange}
                                    required="required"
                                    placeholder="그룹명을 입력해주세요."
                                />
                                {errors.group_name && (
                                    <div className="text-danger">{errors.group_name}</div>
                                )}
                            </td>
                        </tr>                                              
                    </tbody>
                </table>

                {/* 버튼 영역 */}
                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? '처리중...' : '등록'}
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={handleHistoryBack}
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Add;
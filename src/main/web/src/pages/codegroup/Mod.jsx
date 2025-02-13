import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Mod() {
    const navigate = useNavigate();
    const { group_id } = useParams();

    const [formData, setFormData] = useState({
        group_id: '',
        group_name: '',
        group_sort: 0,
        use_yn: ''
    });

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchCode = async () => {
            if (!group_id) {
                navigate('/group');
                return;
            }

            try {
                const response = await axios.get("/api/code/read", {
                    params: { group_id }
                });

                setFormData({
                    group_id: Number(group_id),
                    group_name: response.data.GROUP_NAME || '',
                    group_sort: Number(response.data.GROUP_SORT) || 0,
                    use_yn: response.data.USE_YN === 'Y' ? 1 : 0
                });
            } catch (error) {
                console.error("Error:", error);
                alert("불러오기 실패.");
                navigate("/group");
            } finally {
                setLoading(false);
            }
        };

        fetchCode();
    }, [group_id, navigate]);

    // handleChange 함수 추가
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
    
        // use_yn의 경우 Y/N을 1/0으로 변환
        if (name === 'use_yn') {
            newValue = value === 'Y' ? 1 : 0;
        }
    
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
        // 에러 메시지 초기화
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.group_name.trim()) {
            newErrors.group_name = '그룹명을 입력해주세요.';
        }
        if (!formData.group_sort) {
            newErrors.group_sort = '그룹순번을 입력해주세요.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const requestData = {
                ...formData,
                group_id: Number(formData.group_id),
                group_sort: Number(formData.group_sort),
                use_yn: Number(formData.use_yn)  // 확실하게 숫자로 변환
            };
    
            console.log('Submitting data:', requestData);  // 데이터 확인용
    
            await axios.post('/api/code/mod', requestData);
            navigate("/group");
        } catch (error) {
            console.error('Error:', error);
            setErrors({
                general: error.response?.data?.message || '수정 중 오류가 발생했습니다.'
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>로딩중...</div>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className="table">
                    <caption>
                        <span>
                            <em>홈</em>
                            <em>코드그룹</em>
                            <strong>그룹수정</strong>
                        </span>
                    </caption>
                    <colgroup>
                        <col width="18%" />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>그룹명</th>
                            <td>
                                <input
                                    type="text"
                                    name="group_name"
                                    value={formData.group_name}
                                    onChange={handleChange}
                                    className={`form-control ${errors.group_name ? 'is-invalid' : ''}`}
                                />
                                {errors.group_name && (
                                    <div className="invalid-feedback">
                                        {errors.group_name}
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>그룹순번</th>
                            <td>
                                <input
                                    type="number"
                                    name="group_sort"
                                    value={formData.group_sort}
                                    onChange={handleChange}
                                    className={`form-control ${errors.group_sort ? 'is-invalid' : ''}`}
                                />
                                {errors.group_sort && (
                                    <div className="invalid-feedback">
                                        {errors.group_sort}
                                    </div>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <th>사용여부</th>
                            <td>
                                <select
                                    name="use_yn"
                                    value={formData.use_yn === 1 ? 'Y' : 'N'}  // 숫자를 문자로 변환하여 표시
                                    onChange={handleChange}
                                    className="form-control"
                                >
                                    <option value="Y">사용</option>
                                    <option value="N">미사용</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        수정
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        취소
                    </button>
                </div>

                {errors.general && (
                    <div className="alert alert-danger mt-3" role="alert">
                        {errors.general}
                    </div>
                )}
            </form>
        </div>
    );
}

export default Mod;
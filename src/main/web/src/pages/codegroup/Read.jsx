import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {authenticatedRequest as axios} from"../../plugins/axios";

const Read = () => {
    const navigate = useNavigate();
    const { group_id } = useParams();

    const [code, setCode] = useState(null);
    const [loading, setLoading] = useState(true);  // 초기값을 true로 설정

    useEffect(() => {
        const fetchCodes = async () => {
            if (!group_id) {
                navigate('/group');
                return;
            }

            try {
                const response = await axios.get("/api/code/read", {
                    params: { group_id }
                });
                setCode(response.data);
            } catch (error) {
                console.error("Error:", error);
                alert("불러오기 실패.");
                navigate("/group");
            } finally {
                setLoading(false);
            }
        };

        fetchCodes();
    }, [group_id, navigate]);

    if (loading) return <div>로딩중...</div>;
    if (!code) return <div>데이터가 없습니다.</div>;

    return (
        <div>
            <form>
                <table className="table">
                <caption>
                        <span>
                            <em>홈</em>
                            <em>코드그룹</em>
                            <strong>강의그룹상세</strong>
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
                                    value={String(code.GROUP_NAME || '')}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>그룹순번</th>
                            <td>
                                <input
                                    type="text"
                                    name="group_sort"
                                    value={String(code.GROUP_SORT || '')}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>등록일자</th>
                            <td>
                                <input
                                    type="text"
                                    name="group_sort"
                                    value={String(code.REG_DT || '')}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>사용여부</th>
                            <td>
                                <input
                                    type="text"
                                    name="group_sort"
                                    value={String(code.USE_YN || '')}
                                    className="form-control-plaintext"
                                    readOnly
                                />
                            </td>
                        </tr>
                        </tbody>
                </table>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(`/group/mod/${group_id}`)}>
                        수정
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}>
                        목록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Read;
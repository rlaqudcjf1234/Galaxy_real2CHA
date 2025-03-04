import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { authenticatedRequest as axios } from "../../plugins/axios";
import { useSelector } from "react-redux"; // Redux 상태 확인을 위해 추가

const ApplyList = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState({ pageIndex: 1 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 액세스 토큰 상태 확인
    const accessToken = useSelector((state) => state.accessToken.val);

    const fetchData = async () => {
        if (!accessToken) {
            navigate("/login"); // 토큰이 없으면 로그인 페이지로 리디렉션
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                pageIndex: params.pageIndex.toString(),
            }).toString();

            const response = await axios.get(`/api/apply/list?${queryParams}`);

            if (response.data && Array.isArray(response.data.items)) {
                setItems(response.data.items);
                setTotalCount(response.data.totalCount || 0);
            } else {
                throw new Error("Invalid data format received from server");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.response?.data?.message || "데이터를 불러오는 중 오류가 발생했습니다.");

            // 401 에러 발생 시 (토큰 만료 등) 로그인 페이지로 리디렉션
            if (error.response?.status === 401) {
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.pageIndex, accessToken]); // 의존성 배열에 accessToken 추가

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg">로딩중...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div>
            {/* List.jsx 스타일에 맞춰 테이블 구성 */}
            <table className="table">
                <caption>
                    <span>
                        <em>홈</em>
                        <em>학적부</em>
                        <strong>접수현황</strong>
                    </span>
                    {/* 등록 버튼 */}
                    <Link to="/apply/add" className="btn btn-primary" style={{ float: "right" }}>
                        등록
                    </Link>
                </caption>
                <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="20%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">성명</th>
                        <th scope="col">이메일</th>
                        <th scope="col">연락처</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">등록여부</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.ID}>
                                <td>{item.RNUM}</td>
                                <td>
                                    <Link to={`/apply/read/${item.ID}`}>{item.NAME}</Link>
                                </td>
                                <td>{item.EMAIL}</td>
                                <td>{item.PHONE}</td>
                                <td>{item.REG_DT}</td>
                                <td>{item.USE_YN}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={params.pageIndex}
                totalCount={totalCount}
                onPageChange={(pageIndex) => setParams((prev) => ({ ...prev, pageIndex }))}
            />
        </div>
    );
};

export default ApplyList;

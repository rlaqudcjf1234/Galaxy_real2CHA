import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import { useSelector } from "react-redux";
import Pagination from "../../components/Pagination";
import "../../css/Community.css";

function AdcList() {
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.accessToken.val);

    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageIndex: 1,
        pageSize: 10,
        searchKeyword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const fetchData = async (pageIndex) => {
        if (!accessToken) {
            navigate("/login");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            setParams({
                ...params,
                pageIndex: pageIndex,
            });
            const response = await axios.get("/api/adminCommunity/list", { params: params });
            setItems(response.data.items);
            setTotalCount(response.data.totalCount);

            console.log("서버 응답 데이터:", response.data);
            console.log("items 데이터:", response.data.items);
        } catch (error) {
            console.error("Error fetching data:", error);

            if (error.response?.status === 401) {
                navigate("/login");
                return;
            }

            setError(error.response?.data?.message || "데이터를 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = () => {
        setParams((prev) => ({
            ...prev,
            pageIndex: 1,
            searchKeyword: searchInput,
        }));
        setCurrentPage(1);
        // fetchData(1) 호출 제거 - useEffect에서 처리됨
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    useEffect(() => {
        if (!accessToken) {
            navigate("/login");
            return;
        }

        // params 상태가 변경될 때마다 데이터를 가져오도록 수정
        const fetchCurrentData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("/api/adminCommunity/list", {
                    params: {
                        ...params,
                        pageIndex: currentPage,
                    },
                });

                // 각 아이템에 rnum 속성 추가
                const itemsWithReverseRnum = response.data.items.map((item, index) => ({
                    ...item,
                    rnum: response.data.totalCount - (currentPage - 1) * params.pageSize - index,
                }));

                setItems(itemsWithReverseRnum);
                setTotalCount(response.data.totalCount);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response?.status === 401) {
                    navigate("/login");
                    return;
                }
                setError(error.response?.data?.message || "데이터를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentData();
    }, [currentPage, params, accessToken, navigate]);

    if (loading) {
        return <div className="text-center p-4">데이터를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="검색어를 입력하세요"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-secondary" onClick={handleSearch}>
                                검색
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-end">
                    <Link to={`/adminCommunity/add`}>
                        <button className="btn btn-primary">글쓰기</button>
                    </Link>
                </div>
            </div>

            <table className="table">
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>관리자 게시판</strong>
                    </span>
                </caption>
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">구분</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items) && items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.seq}>
                                <td>{item.rnum}</td>
                                <td>{item.division}</td>
                                <td>
                                    <Link to={`/adminCommunity/read/${item.seq}`}>{item.title}</Link>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.regDt}</td>
                            </tr>
                        ))
                    ) : (
                        <tr key="no-data">
                            <td colSpan="4" className="text-center">
                                게시글이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex gap-2 justify-content-center py-1">
                <Pagination currentPage={currentPage} totalCount={totalCount} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default AdcList;

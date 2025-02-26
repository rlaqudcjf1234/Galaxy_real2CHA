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
        fetchData(1);
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
        fetchData(currentPage);
    }, [currentPage, accessToken]);

    if (loading) {
        return <div className="text-center p-4">데이터를 불러오는 중입니다...</div>;
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="검색어를 입력하세요"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="btn btn-secondary" onClick={handleSearch}>
                        검색
                    </button>
                </div>
                <Link to="/adminCommunity/add">
                    <button className="btn btn-primary">글쓰기</button>
                </Link>
            </div>

            <table className="table table-hover">
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
                                <td>{item.seq}</td>
                                <td>
                                    <Link to={`/adminCommunity/read/${item.seq}`}>{item.title}</Link>
                                </td>
                                <td>{item.division}</td>
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

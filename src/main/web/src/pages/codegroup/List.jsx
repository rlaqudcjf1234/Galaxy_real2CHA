import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {authenticatedRequest as axios} from"../../plugins/axios";
import Pagination from "../../components/Pagination";

const List = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    // 기존 리스트 관련 상태들
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState({ select: "1", text: "" });
    const [params, setParams] = useState({ select: "1", text: "", pageIndex: 1 });
    const [loading, setLoading] = useState(false);

    
    // 기존 데이터 fetch 함수
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/list", { params: params });
            setItems(response.data.items);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // 나머지 핸들러 함수들
    const handlePageChange = (pageIndex) => {
        setParams({
            ...params,
            pageIndex: pageIndex
        });
    };

    const handleSearchChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        setParams({
            ...params,
            pageIndex: 1,
            select: search.select,
            text: search.text
        });
    };

    useEffect(() => {
        fetchData();
    }, [params]);

   // 인증 후 리스트 화면
    return (
        <div>
            <table className="table">
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>코드그룹</strong>
                    </span>
                    <Link to="add" className="btn btn-primary">등록</Link>
                </caption>

                <colgroup>
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                    <col width="20%" />
                </colgroup>
                <thead>
                    <tr>
                        <th>그룹ID</th>
                        <th>그룹명</th>
                        <th>그룹순번</th>
                        <th>등록일자</th>
                        <th>사용여부</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => {
                            const read = `read/${item.GROUP_ID}`;
                            return (
                                <tr key={`${item.GROUP_ID}-${item.GROUP_SORT}`}>
                                    <td>{item.GROUP_ID}</td>
                                    <td>
                                        <Link to={read}>{item.GROUP_NAME}</Link>
                                    </td>
                                    <td>{item.GROUP_SORT}</td>
                                    <td>{item.REG_DT}</td>
                                    <td>{item.USE_YN}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination
                currentPage={params.pageIndex}
                totalCount={totalCount}
                onPageChange={handlePageChange}
            />

            <div className="d-flex gap-2 justify-content-center py-1">
                <div>
                    <select
                        name="select"
                        defaultValue={search.select}
                        onChange={handleSearchChange}
                        className="form-control"
                        required="required"
                    >
                        <option value="1">그룹ID</option>
                        <option value="2">코드NAME</option>
                    </select>
                </div>
                <div className="col-4">
                    <input
                        type="text"
                        name="text"
                        value={search.text}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyPress}
                        className="form-control"
                        placeholder="검색어를 입력하세요"
                    />
                </div>
                <button onClick={handleSearch} className="btn btn-primary">검색</button>
            </div>
        </div>
    );
};

export default List;
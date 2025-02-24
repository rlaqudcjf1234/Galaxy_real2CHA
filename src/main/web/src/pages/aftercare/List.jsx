import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {authenticatedRequest as axios} from '../../plugins/axios';
import Pagination from "../../components/Pagination";
import "../../css/aftercare/AftercareList.css";

const List = () => {
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [search, setSearch] = useState({ select: "name", text: "" });
    const [params, setParams] = useState({ select: "name", text: "", pageIndex: 1 });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/student/list", {
                params: {
                    text: params.text || "",
                    pageIndex: params.pageIndex || 1,
                    pageSize: params.pageSize || 10
                }
            });
            setItems(response.data.items || []);
            setTotalCount(response.data.totalCount || 0);
        } catch (error) {
            console.error("학생 목록 조회 중 오류:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    // 전화번호 포맷 변경 (000-0000-0000)
    const formatPhoneNumber = (phone) => {
        if (phone && phone.length === 11) {
            return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
        }
        return phone;
    };

    // 등록일 포맷 변경 (YYYY-MM-DD)
    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageIndex) => {
        setParams({
            ...params,
            pageIndex: pageIndex
        });
    };

    // 검색 핸들러
    const handleSearchChange = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = () => {
        setParams({
            ...params,
            pageIndex: 1,
            select: search.select,
            text: search.text
        });
    };

    return (
        <div>
            <table className="table">
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>학생 목록</strong>
                    </span>
                </caption>
                <colgroup>
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="25%" />
                    <col width="20%" />
                    <col width="25%" />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">이름</th>
                        <th scope="col">학생 ID</th>
                        <th scope="col">이메일</th>
                        <th scope="col">전화번호</th>
                        <th scope="col">등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? items.map((item, index) => (
                        <tr key={item.SEQ}>
                            <td>
                                {totalCount - ((params.pageIndex - 1) * (params.pageSize || 10)) - index}
                            </td>
                            <td>
                                <Link
                                    to={`/aftercare/read/${item.SEQ}`}
                                    state={{ profile: { name: item.NAME, email: item.EMAIL } }}
                                    className="name-link"
                                >
                                    {item.NAME}
                                </Link>
                            </td>
                            <td>{item.ID}</td>
                            <td>{item.EMAIL}</td>
                            <td>{formatPhoneNumber(item.PHONE)}</td>
                            <td>{formatDate(item.REG_DATE)}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6" className="text-center">데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Pagination
                currentPage={params.pageIndex}
                totalCount={totalCount}
                onPageChange={handlePageChange} />

            <div className="d-flex gap-2 justify-content-center py-1">
                <div>
                    <select
                        name="select"
                        defaultValue={search.select}
                        onChange={handleSearchChange}
                        className="form-control"
                        required="required">
                        <option value="name">이름</option>
                    </select>
                </div>
                <div className="col-4">
                    <input
                        type="text"
                        name="text"
                        value={search.text}
                        onChange={handleSearchChange}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="form-control"
                        placeholder="검색어를 입력하세요" />
                </div>
                <button onClick={handleSearch} className="btn btn-primary">검색</button>
            </div>
        </div>
    );
}

export default List;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticatedRequest as axios } from '../../plugins/axios';
import Pagination from "../../components/Pagination";


const List = () => {
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
    const [search, setSearch] = useState({ select: "2", text: "" });
    const [params, setParams] = useState({ select: "2", text: "", pageIndex: 1 });
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 선택 페이지 변경 데이터 요청
    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            const response = await axios.get("/api/class/list", { params: params });
            setItems(response.data.items); // 목록 데이터
            setTotalCount(response.data.totalCount); // 전체 아이템 수
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // 선택 페이지 변경 핸들러
    const handlePageChange = (pageIndex) => {
        setParams({
            ...params,
            pageIndex: pageIndex
        });
    };

    // 검색어 변경 핸들러
    const handleSearchChange = (e) => {
        setSearch({
            ...search,  // 이전: ...params였던 것을 수정
            [e.target.name]: e.target.value
        });
    };

    // Enter 키로도 검색할 수 있도록 하는 핸들러
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // 검색 실행 핸들러
    const handleSearch = () => {
        setParams({
            ...params,
            pageIndex: 1,
            select: search.select,
            text: search.text
        });
    };

    // 클릭하면 상세 페이지로 이동
    const handleRowClick = (key) => {
        navigate(`/class/Read/${key}`);
    };

    // 선택 페이지 변경 이벤트
    useEffect(() => {
        fetchData();
    }, [params]);

    return (
        <div>
            {/* <div className="d-flex gap-2 justify-content-start py-1">
                <Link to="add">
                    <button className="btn btn-primary">등록</button>
                </Link>

            </div> */
            }
            <table className="table">
                {/* 제목 영역 */}
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>강의현황</strong>
                    </span>
                    <Link to="add" className="btn btn-primary">등록</Link>
                </caption>
                <colgroup>
                    <col width="20%" />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="5%" />
                    <col width="10%" />
                    <col width="7%" />
                    <col width="10%" />


                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">과목명</th>
                        <th scope="col">회차</th>
                        <th scope="col">강사</th>
                        <th scope="col">강의실</th>
                        <th scope="col">총인원</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">강의상태</th>
                        <th scope="col">확정일자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0
                            ? items.map((item) => {
                                const read = `read/${item.SEQ}`;
                                return (
                                    <tr key={item.SEQ}>
                                        <td>
                                            <Link to={read}>{item.LECTURE_NAME}</Link>
                                        </td>
                                        <td>{item.ROUND}</td>
                                        <td>{item.ADMIN_NAME}</td>
                                        <td>{item.ROOM}</td>
                                        <td>{item.PEOPLE}</td>
                                        <td>{item.REG_DT}</td>
                                        <td>{item.CODE_NAME}</td>
                                        <td>{item.CONFIRM_DT}</td>
                                    </tr>
                                )
                            })
                            : (
                                <tr>
                                    <td colSpan="8" className="text-center">데이터가 없습니다.</td>
                                </tr>
                            )
                    }
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
                        <option value="1">과정명</option>
                        <option value="2">강사</option>
                        <option value="3">교실</option>
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
                        placeholder="검색어를 입력하세요" />
                </div>
                <button onClick={handleSearch} className="btn btn-primary">검색</button>
            </div>
        </div>
    );
}

export default List;

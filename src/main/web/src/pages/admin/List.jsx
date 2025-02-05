import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

import Pagination from "../../components/Pagination";

const List = () => {
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
    const [search, setSearch] = useState({select: "1", text: ""});
    const [params, setParams] = useState({select: "1", text: "", pageIndex: 1});
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 선택 페이지 변경 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/admin/list", {params: params});
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
            ...params,
            [e.target.name]: e.target.value // search를 업데이트합니다
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

    // 선택 페이지 변경 이벤트
    useEffect(() => {
        fetchData();
    }, [params]);

    return (
        <div>
            <table className="table">
                {/* 제목 영역 */}
                <caption>
                    <span>
                        <em>홈</em>
                        <strong>강사현황</strong>
                    </span>
                    <Link to="add" className="btn btn-primary">등록</Link>
                </caption>
                <colgroup>
                    <col width="95px"/>
                    <col/>
                    <col width="120px"/>
                    <col width="230px"/>
                    <col width="120px"/>
                    <col width="180px"/>
                    <col width="145px"/>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">이메일</th>
                        <th scope="col">성명</th>
                        <th scope="col">연락처</th>
                        <th scope="col">구분</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">사용여부</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0
                            ? items.map((item) => {
                                return (
                                    <tr key={item.SEQ}>
                                        <td>{item.RNUM}</td>
                                        <td className="title">
                                            <Link to={`mod/${item.SEQ}`}>{item.EMAIL}</Link>
                                        </td>
                                        <td>{item.NAME}</td>
                                        <td>{item.PHONE}</td>
                                        <td>{item.DIVISION}</td>
                                        <td>{item.REG_DT}</td>
                                        <td>{item.USE_YN}</td>
                                    </tr>
                                )
                            })
                            : (
                                <tr>
                                    <td colSpan="6" className="text-center">데이터가 없습니다.</td>
                                </tr>
                            )
                    }
                </tbody>
            </table >
            <Pagination
                currentPage={params.pageIndex}
                totalCount={totalCount}
                onPageChange={handlePageChange}/>

            <div className="d-flex gap-2 justify-content-center py-1">
                <div>
                    <select
                        name="select"
                        defaultValue={search.select}
                        onChange={handleSearchChange}
                        className="form-control"
                        required="required">
                        <option value="1">이메일</option>
                        <option value="2">성명</option>
                        <option value="3">연락처</option>
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
                        placeholder="검색어를 입력하세요"/>
                </div>
                <button onClick={handleSearch} className="btn btn-primary">검색</button>
            </div>
        </div>
    );
}

export default List;
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

    // 하드코딩된 데이터
    const data = [
        {
            SEQ: 1,
            ADMIN_NAME: "김강사",
            LECTURE_NAME: "컴퓨터공학과",
            REG_DT: "2024-01-15"
        }, {
            SEQ: 2,
            ADMIN_NAME: "이강사",
            LECTURE_NAME: "전자공학과",
            REG_DT: "2024-01-16"
        }, {
            SEQ: 3,
            ADMIN_NAME: "박강사",
            LECTURE_NAME: "기계공학과",
            REG_DT: "2024-01-17"
        }, {
            SEQ: 4,
            ADMIN_NAME: "최강사",
            LECTURE_NAME: "화학공학과",
            REG_DT: "2024-01-18"
        }, {
            SEQ: 5,
            ADMIN_NAME: "정강사",
            LECTURE_NAME: "건축공학과",
            REG_DT: "2024-01-19"
        }
    ];

    // 선택 페이지 변경 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            // const response = await axios.get("/api/admin/list", {params: params});
            const response = {
                data: {
                    items: data,
                    totalCount: data.length
                }
            }
            setItems(response.data); // 목록 데이터
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
                        <strong>간의게시판</strong>
                    </span>
                    <Link to="add" className="btn btn-primary">등록</Link>
                </caption>
                <colgroup>
                    <col width="25%"/>
                    <col width="25%"/>
                    <col width="25%"/>
                    <col width="25%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>강사명</th>
                        <th>학과이름</th>
                        <th>등록일자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0
                            ? (items.map((item) => (
                                <tr key={item.SEQ}>
                                    <td>{item.SEQ}</td>
                                    <td>{item.ADMIN_NAME}</td>
                                    <td className="clickable-cell">
                                        {item.LECTURE_NAME}
                                    </td>
                                    <td>{new Date(item.REG_DT).toLocaleDateString()}</td>
                                </tr>
                            )))
                            : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        {
                                            loading
                                                ? "로딩중..."
                                                : "데이터가 없습니다."
                                        }
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
            <Pagination
                currentPage={params.pageIndex}
                totalCount={totalCount}
                onPageChange={handlePageChange}/>

            <div className="d-flex gap-2 justify-content-center py-1">
                <div>
                    <select
                        name="select"
                        value={search.select}
                        onChange={handleSearchChange}
                        className="form-control"
                        required="required">
                        <option value="1">제목</option>
                        <option value="2">내용</option>
                        <option value="3">제목+내용</option>
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
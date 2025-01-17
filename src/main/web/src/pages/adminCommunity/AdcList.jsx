import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import '../../css/Community.css';

function AdcList() {
    // 기본적인 상태 관리
    const [items, setItems] = useState([]); // 게시글 목록
    const [totalCount, setTotalCount] = useState(0); // 전체 게시글 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [params, setParams] = useState({
        pageIndex: 1,
        pageSize: 10,
        searchKeyword: ''
    });
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    // 데이터 가져오기 함수
    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            setParams({
                ...params,
                pageIndex: pageIndex,
            });
            const response = await axios.get("/api/adminCommunity/list", { params: params });
            setItems(response.data.items); // 목록 데이터
            setTotalCount(response.data.totalCount); // 전체 아이템 수

            // 응답 데이터 구조 확인
            console.log('서버 응답 데이터:', response.data);
            console.log('items 데이터:', response.data.items);

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    // 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 검색 핸들러
    const handleSearch = () => {
        setCurrentPage(1);
        fetchData(1, searchInput);
    };

    // 엔터 키 핸들러
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 페이지 변경시 데이터 가져오기
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    if (loading) {
        return (
            <div className="text-center p-4">
                데이터를 불러오는 중입니다...
            </div>
        );
    }

    return (
        <div>
            {/* 검색 및 버튼 영역 */}
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

            {/* 게시글 테이블 */}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">구분</th>
                        <th scope="col">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(items) && items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.seq}>
                                <td>{item.seq}</td>
                                <td>
                                    <Link to={`/adminCommunity/${item.seq}`}>
                                        {item.title}
                                    </Link>
                                </td>
                                <td>{item.division}</td>
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

            {/* 페이지네이션 */}
            <div className="d-flex gap-2 justify-content-center py-1">
                <Pagination
                    currentPage={currentPage}
                    totalCount={totalCount}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default AdcList;
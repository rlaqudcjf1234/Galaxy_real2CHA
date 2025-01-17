import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../css/list.css';
import Pagination from "../../components/Pagination";

function List() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [params, setParams] = useState({ pageIndex: 1 });
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [searchInput, setSearchInput] = useState('');

    // 선택 페이지 변경 데이터 요청
    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            setParams({
                ...params,
                pageIndex: pageIndex,
            });
            const response = await axios.get("/api/lecture/list", { params: params });
            setItems(response.data.items); // 목록 데이터
            setTotalCount(response.data.totalCount); // 전체 아이템 수
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    // 선택 페이지 변경 핸들러
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 선택 페이지 변경 이벤트
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);
    
    const handleRowClick = (seq) => {
        navigate(`/lecture/detail/${seq}`);
    };

    const getFilteredPosts = () => {
        if (!activeSearchTerm.trim()) {
            return posts;
        }

        return posts.filter(post =>
            post.title.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
            post.content?.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(activeSearchTerm.toLowerCase())
        );
    };
    const getCurrentPagePosts = () => {
        const filteredPosts = getFilteredPosts();
        // 최신 글이 먼저 오도록 정렬
        const sortedPosts = [...filteredPosts].sort((a, b) => b.id - a.id);

        // 페이지네이션을 위한 간단한 인덱스 계산
        const startIndex = (currentPage - 1) * pageUnit;
        const endIndex = startIndex + pageUnit;

        return sortedPosts.slice(startIndex, endIndex);
    };
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);  // searchInput을 업데이트합니다
    };
    const handleSearch = () => {
        setActiveSearchTerm(searchInput);
        setCurrentPage(1);
    };

    // Enter 키로도 검색할 수 있도록 하는 핸들러
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <div className="board-container">
            {/* 검색 영역 */}
            <div className="board-header">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
            </div>

            <div>
                <div className="d-flex gap-2 justify-content-start py-1">
                    <Link to="add">
                        <button className="btn btn-primary">등록</button>
                    </Link>


                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">번호</th>
                            <th scope="col">강사번호</th>
                            <th scope="col">학과이름</th>
                            <th scope="col">등록일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.SEQ}
                                    onClick={() => navigate(`/lecture/detail/${item.SEQ}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{item.SEQ}</td>
                                    <td>{item.ADMIN_SEQ}</td>
                                    <td>{item.NAME}</td>
                                    <td>{item.REG_DT}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="d-flex gap-2 justify-content-center py-1">
                    <Pagination currentPage={currentPage}
                        totalCount={totalCount}
                        onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
}
export default List;
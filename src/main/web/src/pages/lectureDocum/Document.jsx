import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/Community.css";
import Pagination from "../../components/Pagination";
import Dropdown from 'react-bootstrap/Dropdown';

function LectureDocument() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false);

    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            const params = {
                pageIndex: pageIndex,
                pageUnit: 10,
                pageSize: 10,
                recordCountPerPage: 10,
                page: pageIndex.toString()
            };

            const response = await axios.get("/api/document/list", { params });
            setItems(response.data.items);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchInput.trim()) {
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get("/api/document/search", {
                params: {
                    search: searchInput,
                    pageIndex: 1,
                    pageSize: 10
                }
            });

            if (response.data && response.data.items) {
                setItems(response.data.items);
                setTotalCount(response.data.totalCount || 0);
                setIsSearchMode(true);
            }
        } catch (error) {
            console.error("Error searching:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isSearchMode) {
            fetchData(currentPage);
        }
    }, [currentPage, isSearchMode]);

    const handlePageChange = (page) => {
        if (!isSearchMode) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchInput("");
        setIsSearchMode(false);
        setCurrentPage(1);
    };

    return (
        <div className="board-container">
            <div className="board-header">
                <div className="board-navigation">
                    <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>홈</span>
                    <span>{'>'}</span>
                    <span onClick={() => navigate('/lecture')} style={{ cursor: 'pointer' }}>강의관리</span>
                </div>
                <div className="header-right">
                    <button onClick={() => navigate('/lecture/add')} className="write-button">등록</button>
                </div>
            </div>
            

            <table className="board-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>강의</th>
                        <th>제목</th>
                        <th>종류</th>
                        <th>내용</th>
                        <th>등록일자</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.SEQ}>
                                <td>{item.SEQ}</td>
                                <td>{item.LECTURE_NAME}</td>
                                <td className="clickable-cell" onClick={() => navigate(`/document/read/${item.SEQ}`)}>
                                    {item.TITLE}
                                </td>
                                <td>{item.DIVISION_NAME}</td>
                                <td>{item.DETAIL}</td>
                                <td>{new Date(item.REG_DT).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                {loading ? "로딩중..." : "데이터가 없습니다."}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                {!isSearchMode && items.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalCount={totalCount}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            <div className="search-box">

                <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                        검검색색
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#">작성자</Dropdown.Item>
                        <Dropdown.Item href="#">작성자작성자</Dropdown.Item>
                        <Dropdown.Item href="#">작작성성자자</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <input
                    type="text"
                    placeholder="학과 검색"
                    value={searchInput}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />


                <button onClick={handleSearch}>검색</button>
                {isSearchMode && (
                    <button onClick={handleClearSearch}>목록으로</button>
                )}
            </div>
        </div>
    );
}

export default LectureDocument;
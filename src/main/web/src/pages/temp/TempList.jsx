import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Community.css";
import Pagination from "../../components/Pagination";
import Dropdown from 'react-bootstrap/Dropdown';

function TempList() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchMode, setIsSearchMode] = useState(false);

    // 하드코딩된 데이터
    const mockData = [
        { SEQ: 1, ADMIN_NAME: "김강사", LECTURE_NAME: "컴퓨터공학과", REG_DT: "2024-01-15" },
        { SEQ: 2, ADMIN_NAME: "이강사", LECTURE_NAME: "전자공학과", REG_DT: "2024-01-16" },
        { SEQ: 3, ADMIN_NAME: "박강사", LECTURE_NAME: "기계공학과", REG_DT: "2024-01-17" },
        { SEQ: 4, ADMIN_NAME: "최강사", LECTURE_NAME: "화학공학과", REG_DT: "2024-01-18" },
        { SEQ: 5, ADMIN_NAME: "정강사", LECTURE_NAME: "건축공학과", REG_DT: "2024-01-19" },
    ];

    const [items, setItems] = useState(mockData);
    const totalCount = mockData.length;

    const handleSearch = () => {
        if (!searchInput.trim()) {
            setItems(mockData);
            return;
        }

        const filtered = mockData.filter(item =>
            item.LECTURE_NAME.includes(searchInput) ||
            item.ADMIN_NAME.includes(searchInput)
        );
        setItems(filtered);
        setIsSearchMode(true);
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
        setItems(mockData);
        setIsSearchMode(false);
        setCurrentPage(1);
    };

    return (
        <div className="board-container">
            <div className="board-container">
                <div className="board-header">
                    <div className="board-navigation">
                        <span onClick={() => navigate('')} style={{ cursor: 'pointer' }}>홈</span>
                        <span>{'>'}</span>
                        <span onClick={() => navigate('')} style={{ cursor: 'pointer' }}>강의관리</span>
                    </div>
                    <div className="header-right">
                        <button onClick={() => navigate('')} className="write-button">등록</button>
                    </div>
                </div>
            
                <table className="board-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>강사명</th>
                            <th>학과이름</th>
                            <th>등록일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            items.map((item) => (
                                <tr key={item.SEQ}>
                                    <td>{item.SEQ}</td>
                                    <td>{item.ADMIN_NAME}</td>
                                    <td className="clickable-cell">
                                        {item.LECTURE_NAME}
                                    </td>
                                    <td>{new Date(item.REG_DT).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    {loading ? "로딩중..." : "데이터가 없습니다."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="search-box">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                            검색구분
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">강사명</Dropdown.Item>
                            <Dropdown.Item href="#">학과명</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
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
        </div>
    );
}

export default TempList;
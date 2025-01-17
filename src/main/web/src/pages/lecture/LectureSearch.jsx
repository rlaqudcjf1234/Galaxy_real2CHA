// src/pages/lecture/LectureSearch.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { usePost } from './LectureContext';
import '../../css/Community.css';

const LectureSearch = () => {
    // Context에서 posts와 loading 상태를 가져옵니다
    const { posts, loading } = usePost();

    // 현재 페이지 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    
    // 한 페이지당 보여줄 게시글 수
    const pageUnit = 10;

    // 검색어로 게시글을 필터링하는 함수
    const getFilteredPosts = () => {
        if (!activeSearchTerm.trim()) {
            return posts;
        }
        
        return posts.filter(post => 
            post.title.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(activeSearchTerm.toLowerCase())
        );
    };

    // 현재 페이지의 게시글을 가져오는 함수
    const getCurrentPagePosts = () => {
        const filteredPosts = getFilteredPosts();
        const startIndex = (currentPage - 1) * pageUnit;
        const endIndex = startIndex + pageUnit;
        
        return filteredPosts.slice(startIndex, endIndex);
    };

    // 검색어 입력 핸들러
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    // 검색 실행 핸들러
    const handleSearch = () => {
        setActiveSearchTerm(searchInput);
        setCurrentPage(1);
    };

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Enter 키 검색 핸들러
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (loading) {
        return <div className="board-container">로딩 중...</div>;
    }

    return (
        <div className="board-container">
            {/* 검색 영역 */}
            <div className="board-header">
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="강의명을 입력하세요" 
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <Link to="/lecture/Add" className="write-button">강의 등록</Link>
            </div>

            {/* 게시글 목록 */}
            <table className="board-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>강사</th>
                        <th>강의명</th>
                        <th>등록일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {getCurrentPagePosts().length > 0 ? (
                        getCurrentPagePosts().map(post => (
                            <tr key={post.seq}>
                                <td>{post.seq}</td>
                                <td className="title">
                                    <Link to={`/lecture/${post.seq}`}>
                                        {post.name}
                                    </Link>
                                </td>
                                <td>{post.admin_seq}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                등록된 강의가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 페이지네이션 */}
            <Pagination 
                currentPage={currentPage}
                totalCount={getFilteredPosts().length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default LectureSearch;
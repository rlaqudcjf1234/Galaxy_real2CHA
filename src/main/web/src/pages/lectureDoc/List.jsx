import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authenticatedRequest as axios } from '../../plugins/axios';

import Pagination from "../../components/Pagination";

function LectureDocument() {
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
    const [lecture, setLecture] = useState({});

    const [search, setSearch] = useState({ select: "1", text: "" });
    const [params, setParams] = useState(useParams());
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/lecture/read", {
                params: {
                    seq: params.lecture_seq
                }
            });
            setLecture(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // 페이지 최초 이벤트
    useEffect(() => {
        fetchFormData();
    }, []);

    // 선택 페이지 변경 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/lectureDoc/list", { params });
            setItems(response.data.items);
            setTotalCount(response.data.totalCount);
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
            ...search,
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
                        <em>교육과정현황</em>
                        <strong>교육설명(<small>{lecture.NAME}</small>)</strong>
                    </span>
                    <Link to="add" className="btn btn-primary">등록</Link>
                </caption>
                <colgroup>
                    <col width="100px" />
                    <col width="200px" />
                    <col />
                    <col width="150px" />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>종류</th>
                        <th>제목</th>
                        <th>등록일자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(items) && items.length > 0
                            ? (items.map((item) => (
                                <tr key={item.SEQ}>
                                    <td>{item.RNUM}</td>
                                    <td>{item.DIVISION_NAME}</td>
                                    <td className="title">
                                        <Link to={`read/${item.SEQ}`}>{item.TITLE}</Link>
                                    </td>
                                    <td>{item.REG_DT}</td>
                                </tr>
                            )))
                            : (
                                <tr>
                                    <td colSpan="4" className="text-center">데이터가 없습니다.</td>
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
                        <option value="1">제목</option>
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

export default LectureDocument;
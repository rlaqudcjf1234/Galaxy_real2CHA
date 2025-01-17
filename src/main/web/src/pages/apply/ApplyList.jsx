// ApplyStdReg.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Pagination from "../../components/Pagination";
import "../../css/Community.css";
const ApplyList = () => {
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
    const [searchInput, setSearchInput] = useState(""); // 검색어
    const [params, setParams] = useState({ pageIndex: 1 });
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 선택 페이지 변경 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/apply/list", { params: params });
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
            pageIndex: pageIndex,
        });
    };

    // 선택 페이지 변경 이벤트
    useEffect(() => {
        fetchData();
    }, [params]);

    return (
        <div>
            <div className="board-header">
                <Link to="add" className="write-button">
                    등록
                </Link>
            </div>
            <table className="board-table">
                <colgroup></colgroup>
                <thead>
                    <tr>
                        <th scope="col">번호</th>
                        <th scope="col">성명</th>
                        <th scope="col">이메일</th>
                        <th scope="col">연락처</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">등록여부</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => {
                            return (
                                <tr>
                                    <td>{item.RNUM}</td>
                                    <td className="title">{item.NAME}</td>
                                    <td>{item.EMAIL}</td>
                                    <td>{item.PHONE}</td>
                                    <td>{item.REG_DT}</td>
                                    <td>N</td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination currentPage={params.pageIndex} totalCount={totalCount} onPageChange={handlePageChange} />
        </div>
    );
};

export default ApplyList;

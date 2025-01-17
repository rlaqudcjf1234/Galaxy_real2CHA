import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Add';

import Pagination from "../../components/Pagination";

function List() {
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [params, setParams] = useState({ pageIndex: 1 });
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 선택 페이지 변경 데이터 요청
    const fetchData = async (pageIndex) => {
        setLoading(true);
        try {
            setParams({
                ...params,
                pageIndex: pageIndex,
            });
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
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // 선택 페이지 변경 이벤트
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    return (
        <div>
            <div className="d-flex gap-2 justify-content-start py-1">
                <Link to="add">
                    <button className="btn btn-primary">등록</button>
                </Link>

            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">과목명</th>
                        <th scope="col">회차</th>
                        <th scope="col">강사</th>
                        <th scope="col">강의실</th>
                        <th scope="col">강의 시작일자</th>
                        <th scope="col">강의 종료일자</th>
                        <th scope="col">강의 시작시간</th>
                        <th scope="col">강의 종료시간</th>
                        <th scope="col">총인원</th>
                        <th scope="col">등록일자</th>
                        <th scope="col">강의상태</th>
                        <th scope="col">확정일자</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? (
                        items.map((item) => (
                            <tr key={item.SEQ}>
                                <td>{item.SUBJECT}</td> {/* 과목명 */}
                                <td>{item.ROUND}</td>   {/* 회차 */}
                                <td>{item.TEACHER}</td> {/* 강사 */}
                                <td>{item.ROOM}</td>    {/* 강의실 */}
                                <td>{item.START_DT}</td> {/* 강의 시작일자 */}
                                <td>{item.END_DT}</td>  {/* 강의 종료일자 */}
                                <td>{item.START_TM}</td> {/* 강의 시작시간 */}
                                <td>{item.END_TM}</td>  {/* 강의 종료시간 */}
                                <td>{item.PEOPLE}</td>  {/* 총인원 */}
                                <td>{item.REG_DT}</td>  {/* 등록일자 */}
                                <td>{item.USE_YN}</td>  {/* 강의상태 */}
                                <td>{item.CONFIRM_DT}</td> {/* 확정일자 */}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="d-flex gap-2 justify-content-center py-1">
                <Pagination currentPage={currentPage} totalCount={totalCount} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default List;

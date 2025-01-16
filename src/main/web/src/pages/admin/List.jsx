import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
<<<<<<< HEAD
            const response = await axios.post("/api/admin/list", { params: params });
=======
            const response = await axios.get("/api/admin/list", {params: params});
>>>>>>> 8fbdf051350393ed507df0b72508948d37952ba4
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
                <Link to="courses">
                    <button className="btn btn-primary">과목 및 클래스</button>
                </Link>
                <Link to="application">
                    <button className="btn btn-primary">신청목록</button>
                </Link>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">이메일</th>
                        <th scope="col">성명</th>
                        <th scope="col">연락처</th>
                        <th scope="col">사용여부</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0
                            ? items.map((item) => {
                                <tr>
                                    <td>{item.seq}</td>
                                    <td>{item.course}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.birthDate}</td>
                                </tr>
                            })
                            : (
                                <tr>
                                    <td colSpan="4" className="text-center">데이터가 없습니다.</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
            <div className="d-flex gap-2 justify-content-center py-1">
                <Pagination currentPage={currentPage} totalCount={totalCount} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default List;

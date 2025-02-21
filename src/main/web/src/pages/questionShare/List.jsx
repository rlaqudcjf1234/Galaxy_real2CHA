import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

import Pagination from "../../components/Pagination";

const List = () => {
    const [items, setItems] = useState([]); // 목록 데이터
    const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수

    const [cls, setCls] = useState([]);
    const [params, setParams] = useState(useParams());
    const [loading, setLoading] = useState(false); // 로딩 상태

    // 페이지 최초 데이터 요청
    const fetchCls = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/class/use");
            setCls(response.data);
        } catch (error) {
            console.error('Error fetching cls:', error);
        } finally {
            setLoading(false);
        }
    };

    // 선택 페이지 변경 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/questionShare/list", {params: params});
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
            pageIndex: pageIndex
        });
    };

    // 선택 페이지 변경 이벤트
    useEffect(() => {
        fetchCls();
        fetchData();
    }, [params]);

    const handleClick = async (seq) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.set("question_seq", params.question_seq);
            formData.set("class_seq", seq);
            const response = await axios.post("/api/questionShare/del", formData);
            fetchData();
        } catch (error) {
            const response = error.response;
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const response = await axios.post("/api/questionShare/add", formData);
            fetchData();
        } catch (error) {
            const response = error.response;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <table className="table">
                {/* 제목 영역 */}
                <caption>
                    <span>
                        <em>홈</em>
                        <em>설문평가</em>
                        <em>설문작성</em>
                        <strong>설문배포</strong>
                    </span>
                </caption>
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>강의</th>
                        <th>등록일자</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.length > 0
                            ? (items.map((item) => (
                                <tr key={item.CLASS_SEQ}>
                                    <td>{item.RNUM}</td>
                                    <td>{item.CLASS_NAME}</td>
                                    <td>{item.REG_DT}</td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => handleClick(item.CLASS_SEQ)}>
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                            )))
                            : (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        데이터가 없습니다.
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
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="question_seq" value={params.question_seq} />
                <div className="d-flex gap-2 justify-content-center py-1">
                    <div>
                        <select
                            name="class_seq"
                            className="form-control"
                            required="required">
                            <option value="">강의 선택</option>
                            {
                                cls.map((item) => (
                                    <option key={item.SEQ} value={item.SEQ}>{item.CLASS_NAME}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button className="btn btn-primary">추가</button>
                </div>
            </form>
        </div>
    );
}

export default List;
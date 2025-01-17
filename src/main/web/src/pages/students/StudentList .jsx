import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react"
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/Pagination';

function StudentList() {
  const [items, setItems] = useState([]); // 목록 데이터
  const [totalCount, setTotalCount] = useState(0); // 전체 아이템 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [params, setParams] = useState({pageIndex: 1});
  const [loading, setLoading] = useState(false); // 로딩 상태
  
   // 선택 페이지 변경 데이터 요청
   const fetchData = async (pageIndex) => {
    setLoading(true);
    try {
        setParams({
            ...params,
            pageIndex: pageIndex
        });
        const response = await axios.get("/api/student", {params: params});
        setItems(response.data.items); // 목록 데이터
        setTotalCount(response.data.totalCount); // 전체 아이템 수
    } catch (error) {
        console.error('Error fetching data:', error);
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
    <div className="stdContainer">
      <h2>수강생 관리</h2>

      {/* 수강생 목록 */}
      <table className="student_List">
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>생년월일</th>
            <th>수강과목</th>
            <th>교육기간</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.phone}</td>
                <td>{student.birthdate}</td>
                <td>{student.course}</td>
                <td>{student.period}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                필터에 맞는 수강생이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;

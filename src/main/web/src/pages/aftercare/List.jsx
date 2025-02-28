import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from "../../plugins/axios";
import Pagination from "../../components/Pagination";
import "../../css/aftercare/AftercareList.css";

const List = () => {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // 검색/필터링 상태
  const [search, setSearch] = useState({
    select: "name",
    text: "",
    classSeq: "",
    lectureSeq: "",
    round: ""
  });

  const [params, setParams] = useState({
    select: "name",
    text: "",
    classSeq: "",
    lectureSeq: "",
    round: "",
    pageIndex: 1,
    pageSize: 10
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 옵션 데이터 불러오기
  const [classOptions, setClassOptions] = useState([]);
  const [lectureOptions, setLectureOptions] = useState([]);
  const [roundOptions, setRoundOptions] = useState([]);

  useEffect(() => {
    axios
      .get("/api/class/use")
      .then((res) => setClassOptions(res.data))
      .catch((err) => console.error("클래스 조회 오류:", err));

    axios
      .get("/api/lecture/use")
      .then((res) => setLectureOptions(res.data))
      .catch((err) => console.error("강의 조회 오류:", err));

    axios
      .get("/api/class/rounds")
      .then((res) => setRoundOptions(res.data))
      .catch((err) => console.error("회차 조회 오류:", err));
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/student/list", {
        params: {
          text: params.text || "",
          select: params.select || "name",
          classSeq: params.classSeq || "",
          lectureSeq: params.lectureSeq || "",
          round: params.round || "",
          pageIndex: params.pageIndex || 1,
          pageSize: params.pageSize || 10
        }
      });
      setItems(response.data.items || []);
      setTotalCount(response.data.totalCount || 0);
    } catch (error) {
      console.error("학생 목록 조회 중 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const formatPhoneNumber = (phone) => {
    if (phone && phone.length === 11) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    }
    return phone;
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const handlePageChange = (pageIndex) => {
    setParams({ ...params, pageIndex });
  };

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setParams({
      ...params,
      pageIndex: 1,
      select: search.select,
      text: search.text,
      classSeq: search.classSeq,
      lectureSeq: search.lectureSeq,
      round: search.round
    });
  };

  return (
    <div>
      <table className="table">
        <caption>
          <span>
            <em>홈</em>
            <strong>학생 목록</strong>
          </span>
        </caption>
        <colgroup>
          <col width="5%" />
          <col width="10%" />
          <col width="10%" />
          <col width="20%" />
          <col width="15%" />
          <col width="10%" />
          <col width="30%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">번호</th>
            <th scope="col">이름</th>
            <th scope="col">학생 ID</th>
            <th scope="col">이메일</th>
            <th scope="col">전화번호</th>
            <th scope="col">등록일</th>
            <th scope="col">클래스 (강의명+회차)</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item, index) => (
              <tr key={item.SEQ}>
                <td>
                  {totalCount -
                    (params.pageIndex - 1) * (params.pageSize || 10) -
                    index}
                </td>
                <td>
                  <Link
                    to={`/student/read/${item.SEQ}`}
                    state={{ profile: { name: item.NAME, email: item.EMAIL } }}
                    className="name-link"
                  >
                    {item.NAME}
                  </Link>
                </td>
                <td>{item.ID}</td>
                <td>{item.EMAIL}</td>
                <td>{formatPhoneNumber(item.PHONE)}</td>
                <td>{formatDate(item.REG_DATE)}</td>
                <td>{item.CLASS_NAME}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={params.pageIndex}
        totalCount={totalCount}
        onPageChange={handlePageChange}
      />

      <div
        className="filter-section"
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <select
            name="select"
            value={search.select}
            onChange={handleSearchChange}
            className="form-control custom-select"
            required
          >
            <option value="name">이름</option>
            <option value="class">강의명</option>
          </select>
        </div>
        <input
          type="text"
          name="text"
          value={search.text}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="form-control"
          placeholder="검색어를 입력하세요"
          style={{ width: "371px" }}
        />
        <button onClick={handleSearch} className="btn btn-primary">
          검색
        </button>
      </div>
    </div>
  );
};

export default List;

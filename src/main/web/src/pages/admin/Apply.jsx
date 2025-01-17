import 'bootstrap/dist/css/bootstrap.min.css';

function AdminApply() {


  return (
    <div className="container mt-5">
      <h1>수강신청 관리</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>이름</th>
            <th>강의</th>
            <th>신청 시간</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {/* 아래엔 실 데이터 넣어야함 */}
          <tr>
            <td>홍길동</td>
            <td>JAVA/AI/ChatGPT 강의</td>
            <td>2025-01-01 12:00</td>
            <td>대기</td>
            <td>
              <button className="btn btn-success btn-sm me-2">승인</button>
              <button className="btn btn-danger btn-sm">거절</button>
            </td>
          </tr>
          <tr>
            <td>곽철용</td>
            <td>AWS 과정</td>
            <td>2025-01-03 11:32</td>
            <td>대기</td>
            <td>
              <button className="btn btn-success btn-sm me-2">승인</button>
              <button className="btn btn-danger btn-sm">거절</button>
            </td>
          </tr>
          <tr>
            <td>김이박</td>
            <td>클라우드</td>
            <td>2025-01-02 12:32</td>
            <td>대기</td>
            <td>
              <button className="btn btn-success btn-sm me-2">승인</button>
              <button className="btn btn-danger btn-sm">거절</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminApply;


/*

  - DB연동 예시

 {reservations.map((reservation) => (
          <tr key={reservation.id}>
            <td>{reservation.name}</td>
            <td>{reservation.course}</td>
            <td>{reservation.date}</td>
            <td>{reservation.status}</td>
            <td>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleApprove(reservation.id)}
              >
                승인
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleReject(reservation.id)}
              >
                거절
              </button>
            </td>
          </tr>
        ))}
*/ 
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authenticatedRequest as axios } from '../../plugins/axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Read = () => {
    const { seq } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);

    // 데이터 요청
    const fetchData = async () => {
        setLoading(true);
        try {
            const params = {};
            const response = await axios.get(`/api/class/read/${seq}`, { params });
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("강의 정보를 불러오는데 실패했습니다.");
            navigate("/class");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!window.confirm("강의를 확정하시겠습니까?")) return;

        try {
            await axios.put(`/api/class/confirm/${seq}`);
            await fetchData();
            alert("강의가 확정되었습니다.");
        } catch (error) {
            console.error("Error confirming lecture:", error);
            alert("강의 확정에 실패했습니다.");
        }
    };

    const handleCancel = async () => {
        if (!window.confirm("강의 확정을 취소하시겠습니까?")) return;

        try {
            await axios.put(`/api/class/cancel/${seq}`);
            await fetchData();
            alert("강의 확정이 취소되었습니다.");
        } catch (error) {
            console.error("Error canceling lecture:", error);
            alert("강의 확정 취소에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [seq]);

    // 버튼 표시 여부를 결정하는 함수
    const renderActionButton = () => {
        if (items.CODE_NAME === '강의취소' || items.CODE_NAME === '종료') {
            return null;
        }

        if (items.CONFIRM_DT && items.CONFIRM_DT !== '') {
            return <button className="btn btn-danger" onClick={handleCancel}>확정취소</button>;
        }

        return <button className="btn btn-success" onClick={handleConfirm}>강의확정</button>;
    };

    return (
        <div>
            <table className="table">
                <caption>
                    <span>
                        <em>홈</em>
                        <em>강의현황</em>
                        <strong>강의 상세정보</strong>
                    </span>
                </caption>
                <colgroup>
                    <col width="15%" />
                    <col width="35%" />
                    <col width="15%" />
                    <col width="35%" />
                </colgroup>
                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan="4" className="text-center">로딩 중...</td>
                        </tr>
                    </tbody>
                ) : items ? (
                    <tbody>
                        <tr>
                            <th scope="row">과목명</th>
                            <td>{items.LECTURE_NAME}</td>
                            <th scope="row">회차</th>
                            <td>{items.ROUND}</td>
                        </tr>
                        <tr>
                            <th scope="row">강사</th>
                            <td>{items.ADMIN_NAME}</td>
                            <th scope="row">강의실</th>
                            <td>{items.ROOM}</td>
                        </tr>
                        <tr>
                            <th scope="row">강의 시작일자</th>
                            <td>{items.START_DT}</td>
                            <th scope="row">강의 종료일자</th>
                            <td>{items.END_DT}</td>
                        </tr>
                        <tr>
                            <th scope="row">강의 시작시간</th>
                            <td>{items.START_TM}</td>
                            <th scope="row">강의 종료시간</th>
                            <td>{items.END_TM}</td>
                        </tr>
                        <tr>
                            <th scope="row">총인원</th>
                            <td>{items.PEOPLE}</td>
                            <th scope="row">등록일자</th>
                            <td>{items.REG_DT}</td>
                        </tr>
                        <tr>
                            <th scope="row">강의상태</th>
                            <td>{items.CODE_NAME}</td>
                            <th scope="row">확정일자</th>
                            <td>{items.CONFIRM_DT === null ? '확정대기' : items.CONFIRM_DT}</td>
                        </tr>
                        <tr>
                            <th>안내사항</th>
                            <td colSpan="4">
                                <p style={{ fontSize: '0.9em', margin: '3px 0', lineHeight: '1.2', textAlign: 'left' }}>
                                    * 강의 확정이 되지 않으면 강의 시작일에 자동으로 강의 개설이 취소됩니다.
                                </p>
                                <p style={{ fontSize: '0.9em', margin: '3px 0', lineHeight: '1.2', textAlign: 'left' }}>
                                    * 강의 확정이 되어야 수강생 모집이 시작됩니다.
                                </p>
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="4" className="text-center">데이터를 찾을 수 없습니다.</td>
                        </tr>
                    </tbody>
                )}
            </table>

            {items && (
                <div className="d-flex justify-content-center mt-3">
                    <div className="d-flex gap-2">
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>목록</button>
                        <button className="btn btn-primary" onClick={() => navigate(`/class/update/${seq}`)}>수정</button>
                        {renderActionButton()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Read;
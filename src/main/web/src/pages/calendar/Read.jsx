import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { authenticatedRequest as axios } from "../../plugins/axios";
import '../../css/CalendarRead.css';

const CalendarRead = () => {
    const [eventInfo, setEventInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 경로 파라미터에서 seq 가져오기
    const { seq } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // 쿼리 파라미터에서 daily 가져오기
    const daily = queryParams.get('daily');
    
    // studentSeq는 경로 파라미터의 seq 사용
    const studentSeq = seq;
    
    const [codes, setCodes] = useState({
        division: []
    });

    console.log("Route params:", { seq, daily });
    // 이벤트 정보 가져오기
    const fetchEventInfo = async () => {
        try {
            console.log("Fetching data for student:", studentSeq, "and date:", daily);
    
            if (!studentSeq || !daily) {
                console.error("Missing required parameters: studentSeq or daily");
                setLoading(false);
                return;
            }
    
            const response = await axios.get('/api/calendar/read', {
                params: { 
                    seq: studentSeq,
                    daily: daily  // ✅ 변환 없이 그대로 전달
                }
            });
    
            console.log("Response data:", response.data);
    
            if (response.data && Array.isArray(response.data)) {
                setEventInfo(response.data);
            } else {
                setEventInfo(response.data ? [response.data] : []);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };
    
    // 코드 목록 가져오기
    const fetchCodes = async () => {
        try {
            const response = await axios.get("/api/code/use", {
                params: { "text": "calendar" }
            });
            
            const data = {};
            if (Array.isArray(response.data)) {
                response.data.forEach(item => {
                    data[item.name] = item.value;
                });
            }
            setCodes(data);
        } catch (error) {
            console.error('Error fetching codes:', error);
        }
    };

    // 컴포넌트 마운트 시 데이터 가져오기
    useEffect(() => {
        if (studentSeq && daily) {
            console.log("Student SEQ and daily found:", studentSeq, daily);
            fetchEventInfo();
            fetchCodes();
        } else {
            console.error("Missing required parameters:", { studentSeq, daily });
            setLoading(false);
        }
    }, [studentSeq, daily]);

    // 로딩 중 화면
    if (loading) {
        return (
            <div className="calendar-read-loading">
                로딩중...
            </div>
        );
    }

    // 학생 정보가 없는 경우
    if (!studentSeq) {
        return (
            <div className="calendar-read-container">
                <div className="calendar-read-header">
                    <h2 className="calendar-read-title">오류</h2>
                </div>
                <div className="calendar-read-content">
                    학생 정보가 제공되지 않았습니다.
                </div>
            </div>
        );
    }

    // 이벤트 정보가 없는 경우
    if (!eventInfo || eventInfo.length === 0) {
        return (
            <div className="calendar-read-container">
                <div className="calendar-read-header">
                    <h2 className="calendar-read-title">일정 상세 정보</h2>
                </div>
                <div className="calendar-read-content">
                    일정 데이터가 없습니다.
                </div>
            </div>
        );
    }

    // 이벤트 정보 표시
    return (
        <div className="calendar-read-container">
            <div className="calendar-read-header">
                <h2 className="calendar-read-title">일정 상세 정보</h2>
            </div>
            <div className="calendar-read-content">
                {eventInfo.map((event, index) => (
                    <div key={index}>
                        <div className="calendar-read-field">
                            <div className="calendar-read-label">학생명</div>
                            <div className="calendar-read-value">{event.STUDENT_NAME || '-'}</div>
                        </div>

                        <div className="calendar-read-field">
                            <div className="calendar-read-label">상태</div>
                            <div className="calendar-read-value">
                                <span className={`calendar-read-status ${
                                    event.DIVISION === '출석' || event.DIVISION === '출석인정' ? 'status-normal' :
                                    event.DIVISION === '결석' || event.DIVISION === '병결' ? 'status-absent' :
                                    event.DIVISION === '지각' ? 'status-late' :
                                    event.DIVISION === '조퇴' ? 'status-early' :
                                    event.DIVISION === '외출' ? 'status-outing' :
                                    event.DIVISION === '휴가' ? 'status-vacation' :
                                    'status-normal'
                                }`}>
                                    {event.DIVISION || '-'}
                                </span>
                            </div>
                        </div>

                        <div className="calendar-read-field">
                            <div className="calendar-read-label">날짜</div>
                            <div className="calendar-read-value">
                                {event.DAILY ? new Date(event.DAILY).toLocaleDateString() : '-'}
                            </div>
                        </div>

                        <div className="calendar-read-field">
                            <div className="calendar-read-label">사유</div>
                            <div className="calendar-read-value">
                                <div className="calendar-read-memo">
                                    {event.MEMO || '-'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarRead;
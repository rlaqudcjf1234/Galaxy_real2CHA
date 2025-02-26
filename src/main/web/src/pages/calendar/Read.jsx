import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authenticatedRequest as axios } from "../../plugins/axios";
import '../../css/CalendarRead.css';

const CalendarRead = () => {
    const [eventInfo, setEventInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const { classseq } = useParams();
    const [codes, setCodes] = useState({
        division: []
    });

    const fetchEventInfo = async () => {
        try {
            const response = await axios.get(`/api/calendar/read`, {
                params: { classSeq: classseq }
            });
            setEventInfo(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert("정보를 불러오지 못했습니다.");
        }
    };

    const fetchCodes = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/code/use", {
                params: { "text": "calendar" }
            });
            const data = {}
            response.data.forEach(item => {
                data[item.name] = item.value
            });
            setCodes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEventInfo();
        fetchCodes();
    }, [classseq]); 

    if (loading) {
        return (
            <div className="calendar-read-loading">
                로딩중...
            </div>
        );
    }

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
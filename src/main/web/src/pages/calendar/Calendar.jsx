import React, { useState, useEffect } from 'react';
import { authenticatedRequest as axios } from "../../plugins/axios";
import '../../css/calendar.css';

const ScheduleForm = ({ selectedDate, onStatusUpdate, scheduleData }) => {
    const [status, setStatus] = useState('');
    const [classSeq, setClassSeq] = useState('');

    useEffect(() => {
        if (selectedDate && scheduleData) {
            const selectedDateTime = new Date(selectedDate);
            const selectedDateString = `${selectedDateTime.getFullYear()}-${String(selectedDateTime.getMonth() + 1).padStart(2, '0')}-${String(selectedDateTime.getDate()).padStart(2, '0')}`;

            const currentSchedule = scheduleData.find(event => {
                const eventDate = new Date(event.DAILY);
                const eventDateString = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}-${String(eventDate.getDate()).padStart(2, '0')}`;

                return eventDateString === selectedDateString;
            });

            console.log('Selected date:', selectedDateString);
            console.log('Found schedule:', currentSchedule);

            setStatus(currentSchedule?.STATUS || '');
            setClassSeq(currentSchedule?.CLASS_SEQ || '');
        }
    }, [selectedDate, scheduleData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!classSeq) {
            alert('클래스를 선택해주세요.');
            return;
        }
        await onStatusUpdate(selectedDate, status, classSeq);
    };

    return (
        <div className="event-form-container">
            <h3 className="text-lg font-semibold mb-4">일정 관리</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="block mb-2">선택된 날짜</label>
                    <input
                        type="text"
                        value={selectedDate ? new Date(selectedDate).toLocaleDateString() : '날짜를 선택하세요'}
                        disabled
                    />
                </div>
                <div>
                    <label className="block mb-2">클래스</label>
                    <select
                        value={classSeq}
                        onChange={(e) => setClassSeq(e.target.value)}
                        required
                    >
                        <option value="">클래스 선택</option>
                        {/* scheduleData에서 고유한 CLASS_SEQ 목록 추출 */}
                        {Array.from(new Set(scheduleData.map(item => item.CLASS_SEQ))).map(seq => (
                            <option key={seq} value={seq}>{seq}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block mb-2">상태</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">상태 선택</option>
                        <option value="normal">정상</option>
                        <option value="cancel">휴강</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={!selectedDate || !status || !classSeq}
                >
                    저장
                </button>
            </form>
        </div>
    );
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date();
        return {
            year: today.getFullYear(),
            month: today.getMonth() + 1
        };
    });
    const [selectedClassSeq, setSelectedClassSeq] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [eventinfo, setEventInfo] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString();
    });

    // axios 인터셉터 설정
    useEffect(() => {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }, []);

    // 데이터 페칭 함수
    // 데이터 페칭 함수
    const fetchData = async () => {
        setLoading(true);
        try {
            // 캘린더 데이터 가져오기
            const response = await axios.get("/api/calendar/list", {
                params: {
                    year: currentDate.year,
                    month: currentDate.month
                }
            });
            setAttendanceData(response.data.items || []);
            setUserRole(response.data.userRole); // 권한 정보 저장

            // 스케줄 데이터 가져오기
            const scheduleResponse = await axios.get("/api/table/list", {
                params: {
                    year: currentDate.year,
                    month: currentDate.month
                }
            });
            setScheduleData(scheduleResponse.data.items || []);

        } catch (error) {
            if (error.response?.status === 401) {
                alert("로그인이 필요합니다.");
                window.location.href = '/login';
            } else {
                console.error("Error fetching data:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentDate.year, currentDate.month]);

    const fetchEventInfo = async () => {
        try {
            const response = await axios.get(`/api/calendar/read`, {
                params: {
                    classSeq: classseq
                }
            });
            setEventInfo(response.data);
        } catch (error) {
            console.error('Complete error object:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error status:', error.response.status);
            }
            alert("정보를 불러오지 못했습니다: " + (error.response?.data?.message || error.message));
        }
    };
    // 상태 업데이트 핸들러
    const handleStatusUpdate = async (date, newStatus, classSeq) => {
        setLoading(true);
        try {
            const selectedDate = new Date(date);
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const formData = {
                daily: formattedDate,
                status: newStatus,
                class_seq: classSeq
            };
            const response = await axios.post("/api/table/mod", formData);
            await fetchData();
        } catch (error) {
            if (error.response?.status === 401) {
                alert("로그인이 필요합니다.");
                window.location.href = '/login';
            } else if (error.response?.status === 403) {
                alert("권한이 없습니다.");
            } else {
                console.error("Error updating status:", error);
                alert("일정 업데이트 중 오류가 발생했습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    // 이벤트 클릭 핸들러
    const handleEventClick = (event, e) => {
        e.stopPropagation();
        console.log('Event data:', event);
    
        if (!event.STUDENT_SEQ) {
            alert('일정 정보를 찾을 수 없습니다.');
            return;
        }
    
        const width = 800;
        const height = 600;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
    
        window.open(
            `/calendar/read/${event.STUDENT_SEQ}`,
            'CalendarRead',
            `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
        );
    };


    // 캘린더 그리드 렌더링 함수
    const renderCalendarGrid = () => {
        const year = currentDate.year;
        const month = currentDate.month - 1;
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const days = [];

        // 이전 달의 날짜들
        for (let i = 0; i < firstDay.getDay(); i++) {
            const prevMonthLastDay = new Date(year, month, 0);
            const date = new Date(year, month - 1, prevMonthLastDay.getDate() - firstDay.getDay() + i + 1);
            days.push({ date, isCurrentMonth: false });
        }

        // 현재 달의 날짜들
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const date = new Date(year, month, i);
            days.push({ date, isCurrentMonth: true });
        }

        // 다음 달의 날짜들
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(year, month + 1, i);
            days.push({ date, isCurrentMonth: false });
        }

        return days;
    };

    // Effects
    useEffect(() => {
        fetchData();
        if (selectedClassSeq) {
            fetchEventInfo(selectedClassSeq);
        }
    }, [currentDate.year, currentDate.month, selectedClassSeq]);
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className="calendar-page-container">
            <div className="calendar-container">
                <div className="calendar-header">
                    <h2 className="calendar-title">{currentDate.year}년 {currentDate.month}월</h2>
                    <div className="calendar-nav">
                        <button onClick={() => setCurrentDate(prev => {
                            let newMonth = prev.month - 1;
                            let newYear = prev.year;
                            if (newMonth < 1) {
                                newMonth = 12;
                                newYear--;
                            }
                            return { year: newYear, month: newMonth };
                        })} disabled={loading}>◀</button>
                        <button onClick={() => setCurrentDate(prev => {
                            let newMonth = prev.month + 1;
                            let newYear = prev.year;
                            if (newMonth > 12) {
                                newMonth = 1;
                                newYear++;
                            }
                            return { year: newYear, month: newMonth };
                        })} disabled={loading}>▶</button>
                    </div>
                </div>
                <div className="calendar-grid">
                    {days.map((day, index) => (
                        <div key={index} className="calendar-weekday">{day}</div>
                    ))}

                    {renderCalendarGrid().map((day, index) => {
                        const isCanceled = scheduleData.some(event => {
                            const eventDate = new Date(event.DAILY);
                            return eventDate.getDate() === day.date.getDate() &&
                                eventDate.getMonth() === day.date.getMonth() &&
                                eventDate.getFullYear() === day.date.getFullYear() &&
                                event.STATUS === 'cancel';
                        });
                        const dayAttendances = attendanceData.filter(event => {
                            const eventDate = new Date(event.DAILY);
                            return eventDate.getDate() === day.date.getDate() &&
                                eventDate.getMonth() === day.date.getMonth() &&
                                eventDate.getFullYear() === day.date.getFullYear();
                        });

                        return (
                            <div
                                key={index}
                                className={`calendar-day 
                                    ${!day.isCurrentMonth ? 'other-month' : ''} 
                                    ${day.date.getDay() === 0 ? 'sunday' : ''} 
                                    ${day.date.getDay() === 6 ? 'saturday' : ''} 
                                    ${isCanceled ? 'cancel-day' : ''}
                                `}
                                onClick={() => setSelectedDate(day.date.toISOString())}
                            >
                                <div className="calendar-day-number">
                                    {day.date.getDate()}
                                </div>
                                <div>
                                    {dayAttendances.map((event, eventIndex) => (
                                        <div
                                            key={eventIndex}
                                            className="calendar-event"
                                            onClick={(e) => handleEventClick(event, e)}
                                        >
                                            {event.STUDENT_NAME} - {event.DIVISION}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* 관리자만 볼 수 있는 기능은 조건부 렌더링 */}
            <ScheduleForm
                selectedDate={selectedDate}
                onStatusUpdate={handleStatusUpdate}
                scheduleData={scheduleData}
            />

            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
        </div>
    );
};

export default Calendar;
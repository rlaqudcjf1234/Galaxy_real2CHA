import React, { useState, useEffect } from 'react';
import { authenticatedRequest as axios } from "../../plugins/axios";
import '../../css/calendar.css';

const ScheduleForm = ({ selectedDate, onStatusUpdate, scheduleData, selectedEvent, onResetForm }) => {
    const [status, setStatus] = useState('');
    const [classSeq, setClassSeq] = useState('');
    const [className, setClassName] = useState('');
    const [adminName, setAdminName] = useState('');
    const [studentSeq, setStudentSeq] = useState('');
    const [division, setDivision] = useState('');
    const [memo, setMemo] = useState('');
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const resetFormFields = () => {
        setStatus('');
        setClassSeq('');
        setClassName('');
        setAdminName('');
        setDivision('');
        setMemo('');
        setName('');
        setIsEditing(false);
    };

    useEffect(() => {
        if (selectedEvent) {
            console.log('Selected Event:', selectedEvent);
            setStatus(selectedEvent.STATUS || '');
            setClassSeq(selectedEvent.CLASS_SEQ || '');
            setClassName(selectedEvent.CLASS_NAME || '');
            setAdminName(selectedEvent.ADMIN_NAME || '');
            setStudentSeq(selectedEvent.STUDENT_SEQ?.toString() || '');
            setName(selectedEvent.STUDENT_NAME || '');

            const divisionMapping = {
                '결석': 'absence',
                '지각': 'perception',
                '조퇴': 'early',
                '외출': 'outing',
                '병결': 'illness',
                '출석인정': 'attend',
                '휴가': 'vacation'
            };
            setDivision(divisionMapping[selectedEvent.DIVISION] || selectedEvent.DIVISION || '');
            setMemo(selectedEvent.MEMO || '');
            setIsEditing(true);
        } else {
            setIsEditing(false);
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

                if (currentSchedule) {
                    setStatus(currentSchedule.STATUS || '');
                    setClassSeq(currentSchedule.CLASS_SEQ || '');
                    setClassName(currentSchedule.CLASS_NAME || '');
                    setAdminName(currentSchedule.ADMIN_NAME || '');
                } else {
                    // 선택된 날짜에 일정이 없는 경우 필드 초기화
                    setIsEditing(false);
                    setStatus('');
                    setClassSeq('');
                    setClassName('');
                    setAdminName('');
                }
            } else {
                // 선택된 날짜가 없는 경우 필드 초기화
                setStatus('');
                setClassSeq('');
                setClassName('');
                setAdminName('');
            }
            // 항상 초기화할 필드들
            setStatus('');
            setClassSeq('');
            setClassName('');
            setAdminName('');
            // 확실한 초기화를 위해 추가
            if (!selectedDate) {
                setAdminName('');
                setClassName('');
                setClassSeq('');
                setStatus('');
            }
        }
    }, [selectedDate, scheduleData, selectedEvent]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            if (!selectedEvent || !selectedEvent.DAILY) {
                alert("수정할 이벤트가 없습니다.");
                return;
            }

            // 날짜 형식을 'YYYY-MM-DD' 형식으로 변경 (하이픈 포함)
            const dateObj = new Date(selectedEvent.DAILY);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;  // 하이픈 포함 형식으로 변경

            const updateData = {
                daily: formattedDate,
                class_seq: classSeq,
                status: status // 필요한 필드만 보냄
            };

            console.log('Sending final data:', updateData);

            const response = await axios.post('/api/table/mod', updateData);

            // 응답 조건 수정 - 단순히 상태 코드만 확인
            if (response.status === 200) {
                alert('일정이 수정되었습니다.');

                // 폼 초기화
                resetFormFields();
                onResetForm();

                // 상태 업데이트
                await onStatusUpdate(selectedDate, status, classSeq, division, memo);
            } else {
                alert('수정할 데이터가 없습니다. 날짜와 다른 정보를 확인해주세요.');
            }
        } catch (error) {
            console.error('Error updating schedule:', error);
            console.error('Error details:', error.response?.data);
            alert('일정 수정 중 오류가 발생했습니다.');
        }
    };
    const handleSave = async (e) => {
        e.preventDefault();

        if (!selectedDate || !classSeq || !status) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }

        try {
            const selectedDateTime = new Date(selectedDate);

            // YYYY-MM-DD 형식 (하이픈 포함)
            const year = selectedDateTime.getFullYear();
            const month = String(selectedDateTime.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDateTime.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            // class_seq가 숫자인지 확인
            // 이미 숫자면 그대로 사용, 문자열이면 해당 클래스의 ID 찾기
            const classSeqValue = !isNaN(parseInt(classSeq))
                ? parseInt(classSeq)
                : classSeq;

            const formData = {
                daily: formattedDate,
                status: status,
                class_seq: classSeqValue
            };

            console.log('Sending data:', formData);

            const response = await axios.post("/api/table/mod", formData);

            if (response.status === 200) {
                alert('일정이 등록되었습니다.');

                // 폼 초기화
                resetFormFields();
                onResetForm();

                // 상태 업데이트
                await onStatusUpdate(selectedDate, status, classSeq);
            }
        } catch (error) {
            console.error('Error saving schedule:', error);
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);

                // 응답 데이터가 있다면 상세 오류 메시지 표시
                const errorMessage = error.response.data.message || error.response.data.error || error.message;
                alert(`일정 등록 중 오류가 발생했습니다: ${errorMessage}`);
            } else {
                alert(`일정 등록 중 오류가 발생했습니다: ${error.message}`);
            }
        }
    };

    // ScheduleForm 컴포넌트 내 폼 표시 부분 수정 (학생, 구분, 메모 제거)
    return (
        <div className="event-form-container">
            <h3 className="text-lg font-semibold mb-4">일정 관리</h3>
            <form>
                <div>
                    <label className="block mb-2">선택된 날짜</label>
                    <input
                        type="text"
                        value={selectedDate ? new Date(selectedDate).toLocaleDateString() : '날짜를 선택하세요'}
                        className={!selectedDate ? 'placeholder-input' : ''}
                        disabled
                    />
                </div>

                <div>
                    <label className="block mb-2">클래스</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={className || classSeq}
                            disabled
                        />
                    ) : (
                        <select
                            value={classSeq}
                            onChange={(e) => {
                                setClassSeq(e.target.value);

                                // 선택된 클래스의 정보 설정
                                const selectedClass = scheduleData.find(item => item.CLASS_SEQ.toString() === e.target.value);
                                if (selectedClass) {
                                    setClassName(selectedClass.CLASS_NAME || '');
                                    // adminName은 편집 모드일 때만 설정, 아니면 그대로 유지
                                    if (isEditing) {
                                        setAdminName(selectedClass.ADMIN_NAME || '');
                                    }
                                }
                            }}
                            required
                        >
                            <option value="">클래스 선택</option>
                            {Array.from(new Set(scheduleData.map(item => item.CLASS_SEQ))).map(seq => (
                                <option key={seq} value={seq}>
                                    {scheduleData.find(item => item.CLASS_SEQ === seq)?.CLASS_NAME || seq}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* 관리자 정보 표시 */}
                {isEditing && adminName && (
                    <div>
                        <label className="block mb-2">담당자</label>
                        <input
                            type="text"
                            value={adminName}
                            disabled
                        />
                    </div>
                )}

                <div>
                    <label className="block mb-2">상태</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">상태 선택</option>
                        <option value="" selected disabled hidden>상태를 선택해주세요</option>
                        <option value="normal">정상</option>
                        <option value="cancel">휴강</option>
                    </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                    {isEditing ? (
                        <button
                            type="button"
                            disabled={!selectedDate || !classSeq}
                            className="submit-button"
                            onClick={handleUpdate}
                        >
                            수정
                        </button>
                    ) : (
                        <button
                            type="button"
                            disabled={!selectedDate || !status || !classSeq}
                            className="submit-button"
                            onClick={handleSave}
                        >
                            저장
                        </button>
                    )}
                </div>
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
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);
    const [eventinfo, setEventInfo] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [selectedDate, setSelectedDate] = useState(null); // 기본값을 null로 변경

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

    // 폼 리셋 함수
    const resetForm = () => {
        setSelectedDate(null);
        setSelectedEvent(null);
    };

    // 상태 업데이트 핸들러
    const handleStatusUpdate = async (date, status, classSeq, division, memo) => {
        setLoading(true);
        try {
            const selectedDate = new Date(date);
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            console.log('Formatted date being sent:', formattedDate);
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
    const handleEventClick = async (event, e) => {
        e.stopPropagation();

        console.log('📌 Event clicked:', event);

        if (!event.STUDENT_SEQ) {
            alert('학생 정보를 찾을 수 없습니다.');
            return;
        }

        try {
            // ✅ KST 시간 변환 (UTC → KST 보정)
            const utcDate = new Date(event.DAILY);
            const offset = utcDate.getTimezoneOffset() * 60000; // 밀리는 현상 방지
            const kstDate = new Date(utcDate.getTime() - offset + (9 * 60 * 60 * 1000)); // 9시간 추가
            const formattedDate = kstDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식 변환

            console.log("🌍 Original DAILY:", event.DAILY);
            console.log("🕰 Adjusted KST Date:", kstDate.toISOString());
            console.log("📅 Sending DAILY:", formattedDate); // ✅ 한국 시간으로 변환

            // API 요청 (올바른 daily 값 전달)
            const response = await axios.get(`/api/calendar/read`, {
                params: {
                    seq: event.STUDENT_SEQ,
                    daily: formattedDate  // ✅ 변환된 날짜 전달
                }
            });

            console.log("✅ API Response:", response.data);

            // URL 생성
            const url = `/calendar/read/${event.STUDENT_SEQ}?daily=${encodeURIComponent(formattedDate)}`;

            // 팝업 창 설정
            const width = 800;
            const height = 600;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;

            window.open(
                url,
                'CalendarRead',
                `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
            );
        } catch (error) {
            console.error('❌ Error fetching student data:', error);
            console.log('🔍 Error response:', error.response);
            alert('학생 정보를 불러오는 중 오류가 발생했습니다.');
        }
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
                        // isCanceled 대신 canceledEvents로 변경
                        const canceledEvents = scheduleData.filter(event => {
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
                                `}
                                onClick={() => {
                                    // 날짜 클릭 시 선택된 이벤트 초기화
                                    setSelectedEvent(null);
                                    // 선택된 날짜 설정
                                    setSelectedDate(day.date.toISOString());
                                }}
                            >
                                <div className="calendar-day-number">
                                    {day.date.getDate()}
                                </div>
                                <div className="calendar-events">
                                    {canceledEvents.map((event, idx) => (
                                        <div
                                            key={idx}
                                            className="calendar-event cancel-event"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log('Clicked event data:', event);
                                                setSelectedEvent(event);
                                                setSelectedDate(day.date.toISOString());
                                            }}
                                        >
                                            {`${event.ADMIN_NAME || ''} - 휴강`}
                                        </div>
                                    ))}

                                    {/* 학생 출석 데이터 추가 */}
                                    {dayAttendances.map((event, idx) => (
                                        <div
                                            key={`attendance-${idx}`}
                                            className={`calendar-event ${event.DIVISION?.toLowerCase().replace(/\s+/g, '')}-event`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEventClick(event, e);
                                            }}
                                        >
                                            {`${event.STUDENT_NAME} - ${event.DIVISION}`}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ScheduleForm
                selectedDate={selectedDate}
                onStatusUpdate={handleStatusUpdate}
                scheduleData={scheduleData}
                selectedEvent={selectedEvent}
                onResetForm={resetForm}  // 폼 리셋 함수 전달
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
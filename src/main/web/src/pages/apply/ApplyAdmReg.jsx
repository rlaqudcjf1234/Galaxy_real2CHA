// ApplyAdmReg.jsx
import React, { useState } from "react";
import axios from "axios";

const ApplyAdmReg = () => {
    // 기본 더미 데이터를 포함한 초기 상태
    const [lectures, setLectures] = useState([
        { seq: 1, lectureName: "리액트 기초", classes: ["A반", "B반"] },
        { seq: 2, lectureName: "스프링부트 입문", classes: ["A반"] },
    ]);
    const [newLecture, setNewLecture] = useState("");
    const [newClass, setNewClass] = useState("");

    // //TODO: Axios를 사용한 데이터 로딩 예시
    // useEffect(() => {
    //     // 강의 목록을 서버에서 비동기적으로 불러오기
    //     const fetchLectures = async () => {
    //         try {
    //             // 백엔드 API 엔드포인트에서 강의 목록 요청
    //             const response = await axios.get("/api/lectures");
    //             setLectures(response.data);
    //         } catch (error) {
    //             console.error("강의 목록 로딩 중 오류:", error);
    //             alert("강의 목록을 불러오는 데 실패했습니다.");
    //         }
    //     };
    //     fetchLectures();
    // }, []);

    // //TODO: Axios를 사용한 강의 추가 예시
    // const addLecture = async (name) => {
    //     if (!name.trim()) {
    //         alert("강의명을 입력해주세요.");
    //         return;
    //     }
    //     try {
    //         // 새 강의를 서버에 POST 요청
    //         const response = await axios.post("/api/lectures", {
    //             lectureName: name,
    //         });
    //         // 서버 응답으로 받은 새 강의 정보로 상태 업데이트
    //         setLectures([...lectures, response.data]);
    //         setNewLecture("");
    //     } catch (error) {
    //         console.error("강의 추가 중 오류:", error);
    //         alert("강의 추가에 실패했습니다.");
    //     }
    // };

    // //TODO: Axios를 사용한 강의 삭제 예시
    // const deleteLecture = async (seq) => {
    //     if (window.confirm("이 강의를 삭제하시겠습니까?")) {
    //         try {
    //             // 특정 강의를 서버에서 DELETE 요청
    //             await axios.delete(`/api/lectures/${seq}`);
    //             // 로컬 상태에서 해당 강의 제거
    //             setLectures(lectures.filter((lecture) => lecture.seq !== seq));
    //         } catch (error) {
    //             console.error("강의 삭제 중 오류:", error);
    //             alert("강의 삭제에 실패했습니다.");
    //         }
    //     }
    // };

    // //TODO: Axios를 사용한 클래스 추가 예시
    // const addClass = async (lectureSeq, className) => {
    //     if (!className.trim()) {
    //         alert("클래스명을 입력해주세요.");
    //         return;
    //     }
    //     try {
    //         // 특정 강의에 새 클래스 추가를 서버에 POST 요청
    //         const response = await axios.post(`/api/lectures/${lectureSeq}/classes`, {
    //             className,
    //         });
    //         // 로컬 상태 업데이트
    //         setLectures(
    //             lectures.map((lecture) =>
    //                 lecture.seq === lectureSeq ? { ...lecture, classes: [...lecture.classes, className] } : lecture
    //             )
    //         );
    //         setNewClass("");
    //     } catch (error) {
    //         console.error("클래스 추가 중 오류:", error);
    //         alert("클래스 추가에 실패했습니다.");
    //     }
    // };

    // 새로운 강의 추가
    const addLecture = (name) => {
        if (!name.trim()) {
            alert("강의명을 입력해주세요.");
            return;
        }
        const newSeq = lectures.length > 0 ? Math.max(...lectures.map((c) => c.seq)) + 1 : 1;
        setLectures([...lectures, { seq: newSeq, lectureName: name, classes: [] }]);
        setNewLecture("");
    };

    // 클래스 추가
    const addClass = (lectureSeq, className) => {
        if (!className.trim()) {
            alert("클래스명을 입력해주세요.");
            return;
        }
        setLectures(
            lectures.map((lecture) =>
                lecture.seq === lectureSeq ? { ...lecture, classes: [...lecture.classes, className] } : lecture
            )
        );
        setNewClass("");
    };

    // 강의 삭제
    const deleteLecture = (seq) => {
        if (window.confirm("이 강의를 삭제하시겠습니까?")) {
            setLectures(lectures.filter((lecture) => lecture.seq !== seq));
        }
    };

    //클래스 삭제
    const deleteClass = (lectureSeq, className) => {
        setLectures(
            lectures.map((lecture) =>
                lecture.seq === lectureSeq
                    ? { ...lecture, classes: lecture.classes.filter((cls) => cls !== className) }
                    : lecture
            )
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">강의 관리</h1>

            <div className="mb-6 p-4 border rounded">
                <h2 className="text-xl font-semibold mb-2">새 강의 추가</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newLecture}
                        onChange={(e) => setNewLecture(e.target.value)}
                        placeholder="강의명 입력"
                        className="flex-1 p-2 border rounded"
                    />
                    <button
                        onClick={() => addLecture(newLecture)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        강의 추가
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {lectures.map((lecture) => (
                    <div key={lecture.seq} className="border rounded p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">{lecture.lectureName}</h3>
                            <button
                                onClick={() => deleteLecture(lecture.seq)}
                                className="text-red-500 hover:text-red-700"
                            >
                                삭제
                            </button>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-medium mb-2">클래스 목록</h4>
                            <ul className="space-y-2">
                                {lecture.classes.map((cls, index) => (
                                    <li key={index} className="flex justify-between items-center">
                                        <span>{cls}</span>
                                        <button
                                            onClick={() => deleteClass(lecture.seq, cls)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            삭제
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newClass}
                                onChange={(e) => setNewClass(e.target.value)}
                                placeholder="클래스명 입력"
                                className="flex-1 p-2 border rounded"
                            />
                            <button
                                onClick={() => addClass(lecture.seq, newClass)}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                클래스 추가
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplyAdmReg;

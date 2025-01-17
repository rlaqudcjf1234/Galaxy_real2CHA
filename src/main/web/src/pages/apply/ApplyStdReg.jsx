// ApplyList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ApplyStdReg = () => {
    // ===== 더미 데이터 시작 =====
    // 테스트용 더미 데이터입니다. 실제 데이터베이스 연동 시 이 부분은 삭제하고
    // 빈 배열 []로 시작하면 됩니다.
    const initialDummyData = [
        { seq: 1, lectureName: "리액트 기초", classes: ["A반", "B반"], studentCount: { A반: 15, B반: 12 } },
        { seq: 2, lectureName: "스프링부트 입문", classes: ["A반"], studentCount: { A반: 8 } },
    ];
    const [lectures, setLectures] = useState(initialDummyData);
    // ===== 더미 데이터 끝 =====

    // 학생 정보 입력을 위한 상태
    const [studentName, setStudentName] = useState("");

    // 수강신청 처리 함수
    const handleApply = (lectureName, className) => {
        if (!studentName.trim()) {
            alert("학생 이름을 입력해주세요.");
            return;
        }

        // 해당 강의와 클래스의 수강신청 처리
        alert(`${studentName}님의 ${lectureName} - ${className} 수강신청이 완료되었습니다!`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">수강신청</h1>

            {/* 학생 정보 입력 섹션 */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">학생 이름</label>
                <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* 강의 목록 섹션 */}
            <div className="space-y-6">
                {lectures.map((lecture) => (
                    <div key={lecture.seq} className="border rounded-lg p-4 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">{lecture.lectureName}</h2>

                        <div className="space-y-4">
                            {lecture.classes.map((className, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded">
                                    <div>
                                        <span className="font-medium">{className}</span>
                                        <span className="ml-4 text-sm text-gray-600">
                                            현재 수강인원: {lecture.studentCount[className]}명
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleApply(lecture.lectureName, className)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        신청하기
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {lectures.length === 0 && (
                <div className="text-center py-8 text-gray-500">현재 신청 가능한 강의가 없습니다.</div>
            )}
        </div>
    );
};

export default ApplyStdReg;

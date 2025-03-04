package com.galaxy.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;
import com.galaxy.service.CalendarService;
import com.galaxy.util.HttpLoginUtil;
import java.text.SimpleDateFormat;
import java.util.Date;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping(value = "calendar")
public class CalendarController {

    @Autowired
    private CalendarService calendarService;

    @GetMapping("/list")
    public ListDto admlist(
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "month", required = false) Integer month) throws Exception {

        // HttpLoginUtil에서 현재 로그인한 사용자의 seq 가져오기
        String userSeq = HttpLoginUtil.getSeq();

        System.out.println("Current user seq: " + userSeq);

        // SeqDto 사용 (SearchDto 대신)
        SeqDto dto = new SeqDto();
        dto.setYear(year);
        dto.setMonth(month);
        dto.setSeq(userSeq); // 이제 정상 작동합니다

        System.out.println("Received params - year: " + year + ", month: " + month);

        int count = calendarService.selectCount(dto);
        List<Map<String, Object>> list = calendarService.calendarList(dto);

        return new ListDto(count, list);
    }

    @GetMapping("/stdlist")
    public ResponseEntity<?> getClassStudentList(
            @RequestParam(name = "room", required = false) String room) {
        try {
            if (room == null || room.isEmpty()) {
                return ResponseEntity.badRequest().body("Room parameter is required");
            }

            List<Map<String, Object>> studentList = calendarService.classStudentList(room);
            if (studentList == null || studentList.isEmpty()) {
                return ResponseEntity.ok(new ArrayList<>()); // 빈 리스트 반환
            }
            return ResponseEntity.ok(studentList);
        } catch (Exception e) {
            // 로깅 추가
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching student list: " + e.getMessage());
        }
    }

    @GetMapping("/read")
    public ResponseEntity<?> calendarRead(@RequestParam("seq") String student_seq,
            @RequestParam(value = "daily", required = false) String daily) {
        try {
            System.out.println("📌 Reading calendar for student: " + student_seq);
            System.out.println("📅 Received daily: " + daily);

            if (daily == null || daily.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "날짜가 제공되지 않았습니다."));
            }

            // 1️⃣ String → java.util.Date 변환
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date utilDate = sdf.parse(daily); // String을 java.util.Date로 변환

            // 2️⃣ java.util.Date → java.sql.Date 변환
            java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());

            // 3️⃣ DTO에 설정
            CalendarDto calendarDto = new CalendarDto();
            calendarDto.setSeq(student_seq);
            calendarDto.setDaily(sqlDate); // ✅ 올바르게 변환된 Date 저장

            // 4️⃣ DB 조회
            List<Map<String, Object>> resultList = calendarService.calendarread(calendarDto);

            if (resultList == null || resultList.isEmpty()) {
                System.out.println("🚫 No data found for student: " + student_seq);
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.ok(resultList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }

}
package com.galaxy.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.CalendarDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;
import com.galaxy.service.CalendarService;
import com.galaxy.util.HttpLoginUtil;

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
public ResponseEntity<?> readCalendar(@RequestParam("classSeq") String classSeq) throws Exception {
    SeqDto dto = new SeqDto();
    dto.setSeq(classSeq);

    List<Map<String, Object>> results = calendarService.calendarread(dto);

    if (results.isEmpty()) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "일정 정보를 찾을 수 없습니다."));
    }

    return ResponseEntity.ok(results);
}

}
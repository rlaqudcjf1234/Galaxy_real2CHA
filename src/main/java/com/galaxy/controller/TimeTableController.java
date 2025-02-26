package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.SeqDto;
import com.galaxy.dto.TimetableDto;
import com.galaxy.service.TimeTableService;
import com.galaxy.util.HttpLoginUtil;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/table")
public class TimeTableController {

    @Autowired
    private TimeTableService timeTableService;
    @Autowired
    private HttpLoginUtil httpLoginUtil;

    @GetMapping("/list")
    public ResponseEntity<ListDto> list(
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "month", required = false) Integer month) throws Exception {
        try {
            String userSeq = httpLoginUtil.getSeq();

            SeqDto dto = new SeqDto(); // SearchDto 대신 SeqDto 사용
            dto.setYear(year);
            dto.setMonth(month);
            dto.setSeq(userSeq); // SeqDto에 있는 seq 필드 사용

            int count = timeTableService.selectCount(dto);
            List<Map<String, Object>> list = timeTableService.tablelist(dto);
            return ResponseEntity.ok(new ListDto(count, list));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/dayread")
    public Map<String, Object> read(@RequestParam(name = "seq") String seq) throws Exception {
        Map<String, Object> map = timeTableService.calendarDay(seq);

        return map;
    }

    @PostMapping("/mod")
    public ResponseEntity<?> mod(@RequestBody TimetableDto dto) throws Exception {
        try {
            timeTableService.statusMod(dto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating status: " + e.getMessage());
        }
    }

}
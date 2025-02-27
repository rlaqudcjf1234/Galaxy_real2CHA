package com.galaxy.controller;

import com.galaxy.dto.StudentDto;
import com.galaxy.dto.ListDto;
import com.galaxy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/list")
    public ResponseEntity<?> list(
        @RequestParam(value="text", required = false) String text,
        @RequestParam(value="select", required = false, defaultValue = "name") String select,
        @RequestParam(value="classSeq", required = false) String classSeq,
        @RequestParam(value="lectureSeq", required = false) String lectureSeq,
        @RequestParam(value="round", required = false) String round,
        @RequestParam(value="pageIndex", required = false, defaultValue = "1") int pageIndex,
        @RequestParam(value="pageSize", required = false, defaultValue = "10") int pageSize) {
        try {
            StudentDto dto = new StudentDto();
            dto.setText(text);
            dto.setSelect(select);
            dto.setClassSeq(classSeq);
            dto.setLectureSeq(lectureSeq);
            dto.setRound(round);
            dto.setPageIndex(pageIndex);
            dto.setPageSize(pageSize);

            ListDto listDto = studentService.getStudentList(dto);
            return ResponseEntity.ok(listDto);
        } catch(Exception e) {
            return ResponseEntity.status(500).body("학생 목록 조회 중 오류 발생");
        }
    }

    @GetMapping("/read/{seq}")
    public ResponseEntity<?> read(@PathVariable("seq") int seq) {
         try {
             Map<String, Object> student = studentService.getStudentRead(seq);
             if(student == null) {
                  return ResponseEntity.notFound().build();
             }
             return ResponseEntity.ok(student);
         } catch(Exception e) {
             return ResponseEntity.status(500).body("학생 상세 조회 중 오류 발생");
         }
    }
}

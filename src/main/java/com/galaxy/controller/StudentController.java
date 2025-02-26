package com.galaxy.controller;

import com.galaxy.dto.StudentDto;
import com.galaxy.dto.ListDto;
import com.galaxy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    StudentService studentService;
    
    @GetMapping("/list")
    public ResponseEntity<?> list(
            @RequestParam(value = "text", required = false) String text,
            @RequestParam(value = "pageIndex", required = false, defaultValue = "1") int pageIndex,
            @RequestParam(value = "pageSize", required = false, defaultValue = "10") int pageSize) {
        try {
            // StudentDto에 기본 생성자가 없으면 StudentDto에 @NoArgsConstructor를 추가해 주세요.
            StudentDto dto = new StudentDto(); // 기본 생성자 필요
            // 검색어와 페이징 정보 설정 (StudentDto에 해당 필드가 없다면, 추후 추가 필요)
            dto.setText(text);
            dto.setPageIndex(pageIndex);
            dto.setPageSize(pageSize);
            
            ListDto listDto = studentService.getStudentList(dto);
            return ResponseEntity.ok(listDto);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("학생 목록 조회 중 오류 발생");
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
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("학생 상세 조회 중 오류 발생");
         }
    }
}

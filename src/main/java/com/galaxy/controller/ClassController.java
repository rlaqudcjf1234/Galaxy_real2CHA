package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ClassDto;
import com.galaxy.dto.CodeDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.ClassService;
import com.galaxy.service.CodeService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/class")
public class ClassController {

    @Autowired
    ClassService classService;


    @GetMapping("/list")
    public ListDto list(SearchDto dto) throws Exception {
        int count = classService.selectCount(dto);
        List<Map<String, Object>> list = classService.selectList(dto);
        ListDto listDto = new ListDto(count, list);
        return listDto;
    }

    @PostMapping("/add")
    public void add(ClassDto dto) throws Exception {
        classService.insertClass(dto);
    }


    @GetMapping("/read/{seq}")
    public ResponseEntity<?> getClassRead(@PathVariable("seq") String seq) { // "seq" 이름을 명시적으로 지정
        try {
            Map<String, Object> classRead = classService.getClassRead(seq);
            if (classRead == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(classRead);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("상세 정보 조회 중 오류가 발생했습니다.");
        }
    }

    @PutMapping("/confirm/{seq}")
    public ResponseEntity<?> confirmClass(@PathVariable("seq") String seq) { // "seq" 이름을 명시적으로 지정
        try {
            classService.confirmClass(seq);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("강의 확정에 실패했습니다.");
        }
    }

    @PutMapping("/cancel/{seq}")
    public ResponseEntity<?> cancelClass(@PathVariable("seq") String seq) {
        try {
            classService.cancelClass(seq);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("강의 확정 취소에 실패했습니다.");
        }
    }

    @PutMapping("/update/{seq}")
    public ResponseEntity<?> updateClass(@PathVariable("seq") int seq, @RequestBody Map<String, Object> params) {
        params.put("SEQ", seq);
        try {
            classService.updateClass(params);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("강의 수정에 실패했습니다.");
        }
    }

    @GetMapping("/use")
    public List<Map<String, Object>> use() throws Exception {
        List<Map<String, Object>> list = classService.selectUseList();
        return list;
    }

    @GetMapping("/read")
    public ResponseEntity<?> readClass(@RequestParam("classSeq") int classSeq) {
        try {
            Map<String, Object> classInfo = classService.getClassInfo(classSeq);
            if (classInfo == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(classInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("수강정보 조회 중 오류 발생");
        }
    }
}

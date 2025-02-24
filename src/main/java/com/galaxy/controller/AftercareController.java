package com.galaxy.controller;

import com.galaxy.dto.AftercareDto;
import com.galaxy.service.AftercareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/aftercare")
public class AftercareController {

    @Autowired
    private AftercareService aftercareService;

    // (신규) 사후관리 생성 전, "학생이 듣는 반의 관리자"를 찾기 위한 API
    @GetMapping("/prepareCreate")
    public ResponseEntity<?> prepareCreate(@RequestParam("studentSeq") int studentSeq) {
        try {
            int adminSeq = aftercareService.findClassAdminSeq(studentSeq);
            Map<String, Object> result = new HashMap<>();
            result.put("adminSeq", adminSeq);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("사후관리 준비 중 오류 발생: " + e.getMessage());
        }
    }

    // 조회
    @GetMapping("/read/{studentSeq}")
    public ResponseEntity<AftercareDto> readAftercare(@PathVariable("studentSeq") int studentSeq) {
        try {
            AftercareDto dto = aftercareService.getAftercare(studentSeq);
            if (dto != null && dto.getStudentSeq() != null) {
                return ResponseEntity.ok(dto);
            } else {
                // AFTERCARE 없으면 빈 DTO
                return ResponseEntity.ok(new AftercareDto());
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAftercare(@RequestBody Map<String, Object> param) {
        try {
            aftercareService.createAftercare(param);
            return ResponseEntity.ok("사후관리 생성 완료");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("사후관리 생성 중 오류 발생: " + e.getMessage());
        }
    }

    // 수정
    @PutMapping("/update")
    public ResponseEntity<?> updateAftercare(@RequestBody Map<String, Object> param) {
        try {
            aftercareService.updateAftercare(param);
            return ResponseEntity.ok("사후관리 수정 완료");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("사후관리 수정 중 오류 발생: " + e.getMessage());
        }
    }
}

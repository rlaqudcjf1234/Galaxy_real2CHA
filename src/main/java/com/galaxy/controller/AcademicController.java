package com.galaxy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.galaxy.dto.AcademicDto;
import com.galaxy.service.AcademicService;

@RestController
@RequestMapping("/academic") 
public class AcademicController {

    @Autowired
    private AcademicService academicService;

    // 학력 조회 API
    @GetMapping("/read")
    public ResponseEntity<?> readAcademic(@RequestParam("studentSeq") int studentSeq) {
        try {
            AcademicDto dto = academicService.getAcademic(studentSeq);
            if (dto == null) {
                // 없으면 빈 DTO 반환(혹은 다른 처리)
                return ResponseEntity.ok(new AcademicDto());
            }
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("학력정보 조회 실패: " + e.getMessage());
        }
    }
}

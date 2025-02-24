package com.galaxy.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.CertificateDto;
import com.galaxy.service.CertificateService;

@RestController
@RequestMapping("/certificate")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    // 학생 seq로 자격증 목록 조회 (/api/certificate/list?studentSeq=...)
    @GetMapping("/list")
    public ResponseEntity<?> getCertificateList(@RequestParam("studentSeq") int studentSeq) {
        List<CertificateDto> certificates = certificateService.getCertificateList(studentSeq);
        if (certificates == null || certificates.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList()); // 404 대신 빈 리스트 반환
        }
        return ResponseEntity.ok(certificates);
    }
}
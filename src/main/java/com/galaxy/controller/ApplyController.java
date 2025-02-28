package com.galaxy.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.EmailDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ApplyMapper;
import com.galaxy.dto.ListDto;
import com.galaxy.service.ApplyService;
import com.galaxy.service.EmailService;
import com.galaxy.service.validator.ApplyValidator;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/apply")
public class ApplyController {

    private final ApplyValidator applyValidator;
    private final ApplyMapper applyMapper;

    @Autowired
    private ApplyService applyService;

    @Autowired
    EmailService emailService;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(applyValidator);
    }

    @GetMapping("/list")
    public ListDto list(SearchDto dto) throws Exception {
        int count = applyService.selectCount(dto);
        List<Map<String, Object>> list = applyService.selectList(dto);
        return new ListDto(count, list);
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> add(@RequestBody ApplyDto dto) {
        try {
            applyService.insertApply(dto);
            return ResponseEntity.ok(Collections.singletonMap("message", "신청이 완료되었습니다."));
        } catch (ValidationException e) {
            System.err.println("Validation Error: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            System.err.println("Unexpected Error: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("message", "처리 중 오류가 발생했습니다."));
        }
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<Map<String, Object>> read(@PathVariable("id") String id) {
        try {
            Map<String, Object> apply = applyMapper.selectApplyRead(id);
            if (apply == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(apply);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteApply(@PathVariable("id") Long id) {
        try {
            int result = applyService.deleteApply(id);
            if (result > 0) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/student-info")
    public ResponseEntity<?> getStudentApplyInfo(@RequestBody ApplyDto applyDto) {
        try {
            ApplyDto applyInfo = applyService.getStudentApplyInfo(applyDto.getName(),
                    applyDto.getEmail(), applyDto.getJumin());

            if (applyInfo == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("신청 정보를 찾을 수 없습니다.");
            }

            return ResponseEntity.ok(applyInfo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminDto adminDto) {
        try {
            AdminDto admin = applyMapper.selectAdminByEmailAndPassword(adminDto);
            if (admin != null) {
                Map<String, Object> response = new HashMap<>();
                response.put("seq", admin.getSeq());
                response.put("email", admin.getEmail());
                response.put("name", admin.getName());
                response.put("phone", admin.getPhone());
                response.put("division", admin.getDivision());
                response.put("post", admin.getPost());
                response.put("reg_dt", admin.getReg_dt());
                response.put("use_yn", admin.getUse_yn());

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Server error");
        }
    }

    @PostMapping("/approve")
    public ResponseEntity<?> approveApply(@RequestBody Map<String, Long> payload) {
        Long id = payload.get("id");
        try {
            ApplyDto dto = applyService.CreateStudent(id);

            EmailDto emailDto = new EmailDto(dto);
            MimeMessage message = emailService.createMessage(emailDto);
            emailService.sendSimpleMessage(message);

            return ResponseEntity.ok().body(Map.of("success", true, "message", "승인이 완료되었습니다."));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    Map.of("success", false, "message", "승인 처리 중 오류가 발생했습니다: " + e.getMessage()));
        }
    }
}

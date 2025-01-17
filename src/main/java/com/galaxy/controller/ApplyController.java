package com.galaxy.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.dto.ListDto;
import com.galaxy.service.ApplyService;
import com.galaxy.service.validator.ApplyValidator;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/apply")
public class ApplyController {

    private final ApplyValidator applyValidator;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(applyValidator);
    }

    @Autowired
    ApplyService applyService;

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
            return ResponseEntity.badRequest()
                    .body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("message", "처리 중 오류가 발생했습니다."));
        }
    }
}
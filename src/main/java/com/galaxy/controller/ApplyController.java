package com.galaxy.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ApplyMapper;
import com.galaxy.dto.ListDto;
import com.galaxy.service.ApplyService;
import com.galaxy.service.validator.ApplyValidator;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/apply")
public class ApplyController {

    private final ApplyValidator applyValidator;
    private final ApplyMapper applyMapper;

    @Autowired
    ApplyService applyService;

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
            // System.out.println("Controller received class_seq: " + dto.getClass_seq());
            // System.out.println("Controller received class_seq type: "
            //         + (dto.getClass_seq() != null ? dto.getClass_seq().getClass().getName() : "null"));

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

    // @GetMapping("/class/list")
    // public ResponseEntity<List<Map<String, Object>>> getClassList() {
    //     try {
    //         List<Map<String, Object>> classes = classMapper.selectClassList();
    //         return ResponseEntity.ok(classes);
    //     } catch (Exception e) {
    //         return ResponseEntity.internalServerError().build();
    //     }
    // }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteApply(@PathVariable("id") Long id) { // 명시적으로 "id" 지정
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
}
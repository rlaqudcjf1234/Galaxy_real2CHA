package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.LectureDocDto;
import com.galaxy.dto.ListDto;
import com.galaxy.service.FileService;
import com.galaxy.service.LectureDocService;
import com.galaxy.service.validator.LectureDocValidator;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/lectureDoc")
public class LectureDocController {

    @Autowired
    private LectureDocValidator lectureDocValidator;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(lectureDocValidator);
    }

    @Autowired
    private LectureDocService lectureDocService;

    @GetMapping("/list")
    public ListDto list(@Valid LectureDocDto dto) throws Exception {

        int count = lectureDocService.selectCount(dto);
        List<Map<String, Object>> list = lectureDocService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/add")
    public void insert(@Valid LectureDocDto dto) throws Exception {
        lectureDocService.insertOne(dto);
    }

    @GetMapping("/read")
    public Map<String, Object> read(@RequestParam(name = "seq")String seq)throws Exception {
        Map<String, Object> map = lectureDocService.selectOne(seq);

        return map;
    }

    @PostMapping("/mod")
    public void mod(@Valid LectureDocDto dto)throws Exception {
        lectureDocService.updateOne(dto);
    }

}

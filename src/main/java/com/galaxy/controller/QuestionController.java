package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.ListDto;
import com.galaxy.dto.QuestionDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.QuestionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/question")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto)throws Exception {

        int count = questionService.selectCount(dto);
        List<Map<String, Object>> list = questionService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/add")
    public void add(@Valid QuestionDto dto)throws Exception {
        questionService.insertOne(dto);
    }

    @GetMapping("/read")
    public Map<String, Object> read(@RequestParam(name = "seq")String seq)throws Exception {
        Map<String, Object> map = questionService.selectOne(seq);

        return map;
    }

    @PostMapping("/mod")
    public void mod(@Valid QuestionDto dto)throws Exception {

        questionService.updateOne(dto);
    }
    

}

package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.ListDto;
import com.galaxy.dto.QuestionShareDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.QuestionShareService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/questionShare")
public class QuestionShareController {

    @Autowired
    QuestionShareService questionShareService;

    @GetMapping("/list")
    public ListDto list(QuestionShareDto dto)throws Exception {

        int count = questionShareService.selectCount(dto);
        List<Map<String, Object>> list = questionShareService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/add")
    public void add(@Valid QuestionShareDto dto)throws Exception {
        questionShareService.insertOne(dto);
    }

    @PostMapping("/del")
    public void del(@Valid QuestionShareDto dto)throws Exception {
        questionShareService.deleteOne(dto);
    }

}

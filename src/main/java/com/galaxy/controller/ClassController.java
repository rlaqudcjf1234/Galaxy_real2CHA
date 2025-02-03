package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ClassDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.ClassService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/class")
public class ClassController {

    @Autowired ClassService classService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto)throws Exception {
        int count = classService.selectCount(dto);
        List<Map<String, Object>> list = classService.selectList(dto);
        ListDto listDto = new ListDto(count, list);
        return listDto;
    }

    @PostMapping("/add")
    public void add(ClassDto dto)throws Exception {
        classService.insertClass(dto);
    }
}

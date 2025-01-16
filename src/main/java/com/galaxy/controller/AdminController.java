package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.AdminService;
import com.galaxy.service.validator.AdminValidator;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/admin")
public class AdminController {

    private final AdminValidator adminValidator;

    @InitBinder public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(adminValidator);
    }

    @Autowired AdminService adminService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto)throws Exception {

        int count = adminService.selectCount(dto);
        List<Map<String, Object>> list = adminService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/add")
    public void add(@Valid AdminDto dto)throws Exception {
		adminService.insertAdmin(dto);
    }
}

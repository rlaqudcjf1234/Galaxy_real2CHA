package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ListDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.service.AdminService;
import com.galaxy.service.validator.AdminValidator;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {

    @Autowired
    private AdminValidator adminValidator;

    @InitBinder
    public void validatorBinder(WebDataBinder binder) {
        binder.addValidators(adminValidator);
    }

    @Autowired 
    private AdminService adminService;

    @GetMapping("/list")
    public ListDto list(SearchDto dto)throws Exception {

        int count = adminService.selectCount(dto);
        List<Map<String, Object>> list = adminService.selectList(dto);

        ListDto listDto = new ListDto(count, list);

        return listDto;
    }

    @PostMapping("/add")
    public void add(@Valid AdminDto dto)throws Exception {
        adminService.insertOne(dto);
    }
    
    // 사용 가능한 admin 목록 조회
    @GetMapping("/use")
    public List<Map<String, Object>> use()throws Exception {
        List<Map<String, Object>> list = adminService.selectUseList();
        return list;
    }

    @GetMapping("/read")
    public Map<String, Object> read(@RequestParam(name = "seq")String seq)throws Exception {
        Map<String, Object> map = adminService.selectOne(seq);

        return map;
    }

    @PostMapping("/mod")
    public void mod(@Valid AdminDto dto)throws Exception {

        adminService.updateOne(dto);
    }

    @PostMapping("/pass")
    public void pass(@Valid AdminDto dto)throws Exception {
        
        adminService.updatePassword(dto);
    }

}

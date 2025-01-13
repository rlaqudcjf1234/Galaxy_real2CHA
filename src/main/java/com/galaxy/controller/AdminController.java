package com.galaxy.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.galaxy.dto.SearchDto;
import com.galaxy.service.AdminService;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

	@RequestMapping(value = "/selectCount")
	public int selectCount(SearchDto dto) throws Exception {
		int count = adminService.selectCount(dto);

		return count;
	}

	@RequestMapping(value = "/selectList", method = RequestMethod.POST)
	public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
		List<Map<String, Object>> list = adminService.selectList(dto);

		return list;
	}

}

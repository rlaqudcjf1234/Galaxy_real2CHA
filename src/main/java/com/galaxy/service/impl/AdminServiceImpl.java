package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.AdminMapper;
import com.galaxy.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    AdminMapper adminMapper;

	@Override
	public int selectCount(SearchDto dto) throws Exception {
		return adminMapper.selectCount(dto);
	}

	@Override
	public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
		return adminMapper.selectList(dto);
	}

}

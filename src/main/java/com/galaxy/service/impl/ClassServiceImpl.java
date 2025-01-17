package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ClassMapper;
import com.galaxy.service.ClassService;

@Service
public class ClassServiceImpl implements ClassService{
   
	@Autowired
    ClassMapper classMapper;

    @Override
	public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
		return classMapper.selectList(dto);
	}

    @Override
	public int selectCount(SearchDto dto) throws Exception {
		return classMapper.selectCount(dto);
	}

    
    
}

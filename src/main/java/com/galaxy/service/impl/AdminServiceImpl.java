package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.AdminMapper;
import com.galaxy.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService{

	protected final String table_nm = "admin";

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

	@Override
	public int insertAdmin(AdminDto dto) throws Exception {
		dto.setTable_nm(table_nm);
		return adminMapper.insertAdmin(dto);
	}

	@Override
	public Map<String, Object> selectOne(String seq) throws Exception {
		return adminMapper.selectOne(seq);
	}

	@Override
	public List<Map<String, Object>> selectUseList() throws Exception {
		return adminMapper.selectUseList();
	}

	

}

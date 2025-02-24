package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.AdminMapper;
import com.galaxy.service.AdminService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

	protected final String table_nm = "admin";

	private final PasswordEncoder passwordEncoder;

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
	public int insertOne(AdminDto dto) throws Exception {
		dto.setTable_nm(table_nm);
		dto.setPassword(passwordEncoder.encode(dto.getPassword()));
		return adminMapper.insertOne(dto);
	}

	@Override
	public Map<String, Object> selectOne(String seq) throws Exception {
		return adminMapper.selectOne(seq);
	}
	
	@Override
	public List<Map<String, Object>> selectUseList() throws Exception {
		return adminMapper.selectUseList();
	}

	@Override
	public int updateOne(AdminDto dto) throws Exception {
		return adminMapper.updateOne(dto);
	}

	@Override
	public int updatePassword(AdminDto dto) throws Exception {
		return adminMapper.updatePassword(dto);
	}

}

package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.SearchDto;

public interface AdminService {

	int selectCount(SearchDto dto) throws Exception;

	List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    int insertAdmin(AdminDto dto) throws Exception;

}

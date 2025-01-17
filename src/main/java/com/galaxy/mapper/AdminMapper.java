package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface AdminMapper {

	int selectUse(String email) throws Exception;

	int selectCount(SearchDto dto) throws Exception;

	List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

	int insertAdmin(AdminDto dto) throws Exception;

    Map<String, Object> selectOne(String seq) throws Exception;

}

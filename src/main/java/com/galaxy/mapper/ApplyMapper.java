package com.galaxy.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;

@Mapper
public interface ApplyMapper {

    int selectCount(SearchDto dto) throws Exception;

    List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    void insertApply(ApplyDto dto) throws Exception;

    int selectByJumin(String jumin); // 주민번호 중복 체크용 메서드
}
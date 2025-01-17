package com.galaxy.service;

import java.util.List;
import java.util.Map;

import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;

public interface ApplyService {

    public int selectCount(SearchDto dto) throws Exception;

    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    public void insertApply(ApplyDto dto) throws Exception;

}

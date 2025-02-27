package com.galaxy.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;

@Service
public interface ApplyService {

    public int selectCount(SearchDto dto) throws Exception;

    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception;

    public void insertApply(ApplyDto dto) throws Exception;

    Map<String, Object> getApplyRead(String seq);

    int deleteApply(Long id);

    ApplyDto getStudentApplyInfo(String name, String email, String jumin);

    AdminDto adminLogin(AdminDto adminDto);

    public void updateStatus(Long id, String useYn) throws Exception;

    ApplyDto CreateStudent(Long id) throws Exception;
}

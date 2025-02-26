package com.galaxy.service.impl;

import com.galaxy.dto.StudentDto;
import com.galaxy.dto.ListDto;
import com.galaxy.mapper.StudentMapper;
import com.galaxy.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    StudentMapper studentMapper;

    @Override
    public ListDto getStudentList(StudentDto dto) throws Exception {
        // 검색어, 페이지 값 처리
        String text = (dto.getText() != null) ? dto.getText() : "";
        int pageIndex = (dto.getPageIndex() != null) ? dto.getPageIndex() : 1;
        int pageSize = (dto.getPageSize() != null) ? dto.getPageSize() : 10;
        int offset = (pageIndex - 1) * pageSize;

        // 전체 학생 수 조회
        int totalCount = studentMapper.selectCount(text);

        // 학생 목록 조회 (검색어와 페이징 적용)
        List<Map<String, Object>> list = studentMapper.selectList(text, offset, pageSize);

        // 결과 반환
        return new ListDto(totalCount, list);
    }

    @Override
    public Map<String, Object> getStudentRead(int seq) throws Exception {
        return studentMapper.studentRead(seq);
    }
}

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
    private StudentMapper studentMapper;

    @Override
    public ListDto getStudentList(StudentDto dto) throws Exception {
        // null인 경우 기본값으로 대체
        String text = (dto.getText() != null) ? dto.getText() : "";
        String select = (dto.getSelect() != null) ? dto.getSelect() : "name";
        String classSeq = (dto.getClassSeq() != null) ? dto.getClassSeq() : "";
        String lectureSeq = (dto.getLectureSeq() != null) ? dto.getLectureSeq() : "";
        String round = (dto.getRound() != null) ? dto.getRound() : "";
        int pageIndex = (dto.getPageIndex() != null) ? dto.getPageIndex() : 1;
        int pageSize = (dto.getPageSize() != null) ? dto.getPageSize() : 10;
        int offset = (pageIndex - 1) * pageSize;

        int totalCount = studentMapper.selectCount(text, select, classSeq, lectureSeq, round);
        List<Map<String, Object>> list = studentMapper.selectList(text, select, classSeq, lectureSeq, round, offset, pageSize);

        return new ListDto(totalCount, list);
    }

    @Override
    public Map<String, Object> getStudentRead(int seq) throws Exception {
        return studentMapper.studentRead(seq);
    }
}

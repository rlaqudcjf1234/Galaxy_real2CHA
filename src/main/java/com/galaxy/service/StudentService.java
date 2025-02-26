package com.galaxy.service;

import com.galaxy.dto.StudentDto;
import com.galaxy.dto.ListDto;
import java.util.Map;

public interface StudentService {
    ListDto getStudentList(StudentDto dto) throws Exception;
    
    Map<String, Object> getStudentRead(int seq) throws Exception;
}

package com.galaxy.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.galaxy.dto.AcademicDto;
import com.galaxy.mapper.AcademicMapper;
import com.galaxy.service.AcademicService;

@Service
public class AcademicServiceImpl implements AcademicService {

    @Autowired
    private AcademicMapper academicMapper;

    @Override
    public AcademicDto getAcademic(int studentSeq) throws Exception {
        return academicMapper.selectAcademic(studentSeq);
    }
}

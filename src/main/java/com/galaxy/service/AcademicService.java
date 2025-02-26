package com.galaxy.service;

import com.galaxy.dto.AcademicDto;

public interface AcademicService {
    AcademicDto getAcademic(int studentSeq) throws Exception;
}

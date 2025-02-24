package com.galaxy.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.galaxy.dto.AcademicDto;

@Mapper
public interface AcademicMapper {
    AcademicDto selectAcademic(@Param("studentSeq") int studentSeq) throws Exception;
}

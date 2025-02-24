package com.galaxy.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.galaxy.dto.CertificateDto;

@Mapper
public interface CertificateMapper {
    List<CertificateDto> selectCertificates(@Param("studentSeq") int studentSeq);
}

package com.galaxy.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.galaxy.dto.CertificateDto;
import com.galaxy.mapper.CertificateMapper;
import com.galaxy.service.CertificateService;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    CertificateMapper certificateMapper;

    @Override
    public List<CertificateDto> getCertificateList(int studentSeq) {
        return certificateMapper.selectCertificates(studentSeq);
    }
}

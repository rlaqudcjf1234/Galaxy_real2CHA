package com.galaxy.service;

import java.util.List;

import com.galaxy.dto.CertificateDto;

public interface CertificateService {
    
    List<CertificateDto> getCertificateList(int studentSeq);
}

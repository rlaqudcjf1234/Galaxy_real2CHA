package com.galaxy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CertificateDto {
    
    private Integer studentSeq;
    private Integer sort;
    private String certName;
    private String certNo;
    private String passDt;
    private String issuer;
}
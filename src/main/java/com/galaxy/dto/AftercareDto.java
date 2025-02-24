package com.galaxy.dto;

import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AftercareDto {

    private Integer studentSeq;
    private Integer adminSeq;
    private String employmentHope;
    private String companyLevel;
    private String companyType;
    private String companyNation;
    private String companyLocation;
    private String earlyEmployment;
    private String generalEmployment;

    private String studentName;   
    private String lectureName;   
    private String adminName;
    private String email; // 이메일 필드 추가

    // 생성자 (Map 기반)
    public AftercareDto(Map<String, Object> data) {
        if (data.get("STUDENT_SEQ") != null) {
            this.studentSeq = ((Number) data.get("STUDENT_SEQ")).intValue();
        }
        if (data.get("ADMIN_SEQ") != null) {
            this.adminSeq = ((Number) data.get("ADMIN_SEQ")).intValue();
        }
        this.employmentHope    = (String) data.get("EMPLOYMENT_HOPE");
        this.companyLevel      = (String) data.get("COMPANY_LEVEL");
        this.companyType       = (String) data.get("COMPANY_TYPE");
        this.companyNation     = (String) data.get("COMPANY_NATION");
        this.companyLocation   = (String) data.get("COMPANY_LOCATION");
        this.earlyEmployment   = (String) data.get("EARLY_EMPLOYMENT");
        this.generalEmployment = (String) data.get("GENERAL_EMPLOYMENT");

        // 조인 결과
        this.studentName = (String) data.get("STUDENT_NAME");
        this.lectureName = (String) data.get("LECTURE_NAME");
        this.adminName   = (String) data.get("ADMIN_NAME");
        this.email       = (String) data.get("EMAIL");
    }
}

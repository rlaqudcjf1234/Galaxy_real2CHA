package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdcPostDto {
    private Long adminSeq; // 관리자 및 강사 순번
    private String name;
    private String title;      // 제목
    private String division;   // 구분
    private String detail;     // 상세
    // regDt는 서버에서 생성되므로 제외
    // seq는 자동 생성되므로 제외
}
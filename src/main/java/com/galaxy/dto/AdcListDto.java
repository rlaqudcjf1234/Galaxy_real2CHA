package com.galaxy.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdcListDto {
    // 게시글 하나의 정보를 담는 내부 클래스
    @Getter
    @Setter
    public static class AdcItem {
        private Long seq;          // 게시판 시퀀스
        private Long adminSeq;     // 관리자 및 강사 순번
        private String name;       // 관리자 명
        private String title;      // 제목
        private String division;   // 구분
        private String detail;     // 상세
        private String regDt;      // 등록일자 (문자열 형태로 받음)
    }
    
    private int totalCount;        // 전체 게시글 수
    private List<AdcItem> items;   // 게시글 목록

    // totalCount와 items를 받는 생성자
    public AdcListDto(int totalCount, List<AdcItem> items) {
        this.totalCount = totalCount;
        this.items = items;
    }
}
// src/main/java/com/galaxy/dto/AdcSearchDto.java
package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdcSearchDto extends SearchDto {
    private String searchKeyword; // 검색어 (제목, 내용 검색용)
}
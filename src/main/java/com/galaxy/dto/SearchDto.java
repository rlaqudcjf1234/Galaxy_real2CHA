package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchDto extends PageDto {
	
	private String select = "1";
	
	private String text = "";

	private Integer year;    // 추가
	
    private Integer month;   // 추가

}

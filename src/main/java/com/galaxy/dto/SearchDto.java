package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchDto extends PageDto {

	private String email;
	
	private String name;

}

package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto extends SeqDto {

    private String email;

	private String password;

	private String name;

	private String division;

}

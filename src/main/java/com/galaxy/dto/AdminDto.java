package com.galaxy.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDto extends SeqDto{

	private String email;
	
	private String password;
	
	private String password2;

	private String name;
	
	private String phone;
	
	private String division;
	
	private String post;
	
	private Date reg_dt;
	
	private String use_yn;
	
}

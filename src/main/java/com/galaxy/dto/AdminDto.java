package com.galaxy.dto;

import java.sql.Date;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDto extends SeqDto{

	@Email
	@NotNull
	@NotBlank
	private String email;
	
	@NotNull
	@NotBlank
	private String password;
	
	@NotNull
	@NotBlank
	private String password2;

	@NotNull
	@NotBlank
	private String name;
	
	private String phone;
	
	@NotNull
	@NotBlank
	private String division;
	
	private String post;
	
	private Date reg_dt;
	
	private String use_yn;

	public boolean isConfirm() {
		return this.password.equals(this.password2);
	}
	
}

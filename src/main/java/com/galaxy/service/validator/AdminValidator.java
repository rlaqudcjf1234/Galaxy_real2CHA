package com.galaxy.service.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.galaxy.dto.AdminDto;
import com.galaxy.mapper.AdminMapper;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminValidator extends AbstractValidator<AdminDto> {

    @Autowired AdminMapper adminMapper;

    @Override protected void doValidate(AdminDto dto, Errors errors) {
        try {
            if (errors.getFieldError("email") == null && adminMapper.selectUse(dto.getEmail()) > 0) {
                errors.rejectValue("email", "이메일 중복 오류", "이미 사용중인 이메일 입니다.");
            }
            if (errors.getFieldError("password") == null && errors.getFieldError("password2") == null && !dto.getPassword().equals(dto.getPassword2())) {
                errors.rejectValue("password2", "비밀번호 확인 불일치", "비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            errors.rejectValue("email", "이메일 중복 오류", e.getMessage());
        }
    }
}
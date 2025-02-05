package com.galaxy.service.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.galaxy.dto.UserDto;
import com.galaxy.mapper.UserMapper;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class UserValidator extends AbstractValidator<UserDto> {

    @Autowired UserMapper userMapper;

    @Autowired HttpServletRequest request;

    @Override protected void doValidate(UserDto dto, Errors errors) {
        try {
            String uri = request.getRequestURI();

            if (uri.indexOf("/login") > -1) {
                if (errors.getFieldError("email") == null && errors.getFieldError("password") == null) {
                    switch (userMapper.selectUse(dto)) {
                        case 1:
                            errors.rejectValue("email", "이메일 오류", "등록된 이메일 없습니다.");
                            break;
                        case 2:
                            errors.rejectValue("password", "비밀번호 오류", "비밀번호가 일치하지 않습니다.");
                            break;
                    }
                }
            } else {
                errors.rejectValue("connect", "접근 오류", "잘못된 접근입니다.");
            }
        } catch (Exception e) {
            errors.rejectValue("connect", "접근 오류", "잘못된 접근입니다.");
        }
    }

}

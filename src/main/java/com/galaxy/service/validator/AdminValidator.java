package com.galaxy.service.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.galaxy.dto.AdminDto;
import com.galaxy.mapper.AdminMapper;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class AdminValidator extends AbstractValidator<AdminDto> {

    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private HttpServletRequest request;

    @Override protected void doValidate(AdminDto dto, Errors errors) {
        try {
            if ("POST".equals(request.getMethod())) {
                if(errors.getFieldError("email") == null){
                    if (adminMapper.selectUse(dto.getEmail()) > 0) {
                        errors.rejectValue("email", "이메일 중복 오류", "이미 사용중인 이메일 입니다.");
                    }
                }

                if(errors.getFieldError("password") == null){
                    if(dto.getPassword() == null || dto.getPassword().isBlank()){
                        errors.rejectValue("password", "비밀번호 공백", "공백일 수 없습니다.");
                    }
                }
                if(errors.getFieldError("password2") == null){
                    if(dto.getPassword2() == null || dto.getPassword2().isBlank()){
                        errors.rejectValue("password2", "비밀번호 공백", "공백일 수 없습니다.");
                    }
                }
                if(errors.getFieldError("password") == null && errors.getFieldError("password2") == null){
                    if (!dto.getPassword().equals(dto.getPassword2())) {
                        errors.rejectValue("password2", "비밀번호 확인 불일치", "비밀번호가 일치하지 않습니다.");
                    }
                }

                if(errors.getFieldError("name") == null) {
                    if(dto.getName() == null || dto.getName().isBlank()){
                        errors.rejectValue("name", "성명 공백", "공백일 수 없습니다.");
                    }
                }

                if(errors.getFieldError("division") == null) {
                    if(dto.getDivision() == null || dto.getDivision().isBlank()){
                        errors.rejectValue("division", "구분 공백", "이 항목은 필수입니다.");
                    }
                }
            } else if ("PUT".equals(request.getMethod())) {
                
                if (errors.getFieldError("password") == null && errors.getFieldError("password2") == null && !dto.getPassword().equals(dto.getPassword2())) {
                    errors.rejectValue("password2", "비밀번호 확인 불일치", "비밀번호가 일치하지 않습니다.");
                }
            }
        } catch (Exception e) {
            errors.rejectValue("email", "이메일 중복 오류", e.getMessage());
        }
    }
}
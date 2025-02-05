package com.galaxy.service.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.galaxy.dto.AdminDto;
import com.galaxy.mapper.AdminMapper;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class AdminValidator extends AbstractValidator<AdminDto> {

    @Autowired AdminMapper adminMapper;

    @Autowired HttpServletRequest request;

    @Override protected void doValidate(AdminDto dto, Errors errors) {
        try {
            String uri = request.getRequestURI();

            if (uri.indexOf("/add") > -1) {
                if (errors.getFieldError("email") == null) {
                    if (adminMapper.selectUse(dto.getEmail()) > 0) {
                        errors.rejectValue("email", "이메일 중복 오류", "이미 사용중인 이메일 입니다.");
                    }
                }

                if (dto.getPassword() == null || dto.getPassword().isBlank()) {
                    errors.rejectValue("password", "비밀번호 공백", "공백일 수 없습니다.");
                }
                if (dto.getPassword2() == null || dto.getPassword2().isBlank()) {
                    errors.rejectValue("password2", "비밀번호 공백", "공백일 수 없습니다.");
                }
                if (errors.getFieldError("password") == null && errors.getFieldError("password2") == null) {
                    if (!dto.getPassword().equals(dto.getPassword2())) {
                        errors.rejectValue("password2", "비밀번호 확인 불일치", "비밀번호가 일치하지 않습니다.");
                    }
                }

                if (dto.getName() == null || dto.getName().isBlank()) {
                    errors.rejectValue("name", "성명 공백", "공백일 수 없습니다.");
                }

                if (dto.getDivision() == null || dto.getDivision().isBlank()) {
                    errors.rejectValue("division", "구분 공백", "이 항목은 필수입니다.");
                }
            } else if (uri.indexOf("/mod") > -1) {
                if (dto.getSeq() == null || dto.getSeq() == 0) {
                    errors.rejectValue("seq", "시퀀스 공백", "공백일 수 없습니다.");
                }

                if (dto.getName() == null || dto.getName().isBlank()) {
                    errors.rejectValue("name", "성명 공백", "공백일 수 없습니다.");
                }

                if (dto.getDivision() == null || dto.getDivision().isBlank()) {
                    errors.rejectValue("division", "구분 공백", "이 항목은 필수입니다.");
                }

                if (dto.getUse_yn() == null || dto.getUse_yn().isBlank()) {
                    errors.rejectValue("division", "구분 공백", "이 항목은 필수입니다.");
                }
            } else if (uri.indexOf("/pass") > -1) {
                if (dto.getSeq() == null || dto.getSeq() == 0) {
                    errors.rejectValue("seq", "시퀀스 공백", "공백일 수 없습니다.");
                }

                if (dto.getPassword() == null || dto.getPassword().isBlank()) {
                    errors.rejectValue("password", "비밀번호 공백", "공백일 수 없습니다.");
                }
                if (dto.getPassword2() == null || dto.getPassword2().isBlank()) {
                    errors.rejectValue("password2", "비밀번호 공백", "공백일 수 없습니다.");
                }
                if (errors.getFieldError("password") == null && errors.getFieldError("password2") == null) {
                    if (!dto.getPassword().equals(dto.getPassword2())) {
                        errors.rejectValue("password2", "비밀번호 확인 불일치", "비밀번호가 일치하지 않습니다.");
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
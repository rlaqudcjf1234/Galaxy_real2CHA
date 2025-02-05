package com.galaxy.service.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import com.galaxy.dto.ApplyDto;
import com.galaxy.mapper.ApplyMapper;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ApplyValidator extends AbstractValidator<ApplyDto> {

    @Autowired
    ApplyMapper applyMapper; // Mapper 주입

    // @Autowired
    // private ClassMapper classMapper;

    @Override
    protected void doValidate(ApplyDto dto, Errors errors) {
        try {
            // System.out.println("Validator received class_seq: " + dto.getClass_seq());
            // System.out.println("Validator received class_seq type: " + (dto.getClass_seq() != null ? dto.getClass_seq().getClass().getName() : "null"));
            // 주민번호 중복 체크 - 이전 에러가 없고 DB에 이미 존재하는 경우
            if (errors.getFieldError("jumin") == null && applyMapper.selectByJumin(dto.getJumin()) > 0) {
                errors.rejectValue("jumin", "주민등록번호 중복 오류", "이미 등록된 주민등록번호입니다.");
            } else if (errors.getFieldError("phone") == null && applyMapper.selectByPhone(dto.getPhone()) > 0) {
                errors.rejectValue("phone", "전화번호 중복 오류", "이미 등록된 전화번호입니다.");
            }

            // 필수값 검증
            validateRequiredField(dto.getJumin(), "jumin", "주민등록번호", errors);
            validateRequiredField(dto.getName(), "name", "이름", errors);
            validateRequiredField(dto.getReal_zipcode(), "real_zipcode", "실거주 우편번호", errors);
            validateRequiredField(dto.getReal_address1(), "real_address1", "실거주 주소", errors);
            validateRequiredField(dto.getReal_address2(), "real_address2", "실거주 주소 상세", errors);
            validateRequiredField(dto.getEmail(), "email", "이메일", errors);
            validateRequiredField(dto.getPhone(), "phone", "전화번호", errors);
            validateRequiredField(dto.getPath(), "path", "지원경로", errors);

            // if (dto.getClass_seq() == null) {
            //     errors.rejectValue("class_seq", "required.class_seq", "클래스를 선택해주세요.");
            // }
            
        } catch (Exception e) {
            errors.rejectValue("jumin", "jumin.error", e.getMessage());
        }
    }

    private void validateRequiredField(String value, String fieldName, String fieldLabel, Errors errors) {
        if (value == null || value.trim().isEmpty()) {
            errors.rejectValue(fieldName, "required." + fieldName, fieldLabel + " 필수");
        }
    }
}
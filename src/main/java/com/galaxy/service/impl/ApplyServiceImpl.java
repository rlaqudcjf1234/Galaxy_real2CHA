package com.galaxy.service.impl;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;

import com.galaxy.dto.AdminDto;
import com.galaxy.dto.ApplyDto;
import com.galaxy.dto.SearchDto;
import com.galaxy.mapper.ApplyMapper;
import com.galaxy.service.ApplyService;
import com.galaxy.service.validator.ApplyValidator;

import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplyServiceImpl implements ApplyService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final ApplyMapper applyMapper;
    private final ApplyValidator applyValidator;

    @Override
    public int selectCount(SearchDto dto) throws Exception {
        return applyMapper.selectCount(dto);
    }

    @Override
    public List<Map<String, Object>> selectList(SearchDto dto) throws Exception {
        return applyMapper.selectList(dto);
    }

    @Override
    public void insertApply(ApplyDto dto) throws Exception {
        try {
            if (dto == null || dto.getClass_seq() == null || dto.getClass_seq() <= 0) {
                throw new ValidationException("클래스를 선택해주세요.");
            }

            BindingResult bindingResult = new BeanPropertyBindingResult(dto, "applyDto");
            applyValidator.validate(dto, bindingResult);

            if (bindingResult.hasErrors()) {
                String errorMessage = bindingResult.getAllErrors().get(0).getDefaultMessage();
                throw new ValidationException(errorMessage != null ? errorMessage : "유효성 검사 오류");
            }

            applyMapper.insertApply(dto);
        } catch (ValidationException e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ValidationException("처리 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @Override
    public Map<String, Object> getApplyRead(String seq) {
        return applyMapper.selectApplyRead(seq);
    }

    @Override
    public int deleteApply(Long id) {
        return applyMapper.deleteApply(id);
    }

    @Override
    public ApplyDto getStudentApplyInfo(String name, String email, String jumin) {
        // 입력값 유효성 검사
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("이름은 필수 입력값입니다.");
        }
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("이메일은 필수 입력값입니다.");
        }
        if (jumin == null || jumin.trim().isEmpty()) {
            throw new IllegalArgumentException("주민번호는 필수 입력값입니다.");
        }

        return applyMapper.selectApplyByStudentInfo(name, email, jumin);
    }

    @Override
    public AdminDto adminLogin(AdminDto adminDto) {
        return applyMapper.selectAdminByEmailAndPassword(adminDto);
    }

    @Override
    public void updateStatus(Long id, String useYn) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        params.put("useYn", useYn);
        applyMapper.updateStatus(params);
    }

    @Override
    public ApplyDto CreateStudent(Long id) throws Exception {
        // 1. APPLY 데이터 조회
        ApplyDto applyDto = applyMapper.selectApplyById(id);
        if (applyDto == null) {
            throw new Exception("신청 정보를 찾을 수 없습니다.");
        }

        try {
            // 2. 학생 비밀번호 암호화 처리
            // 예시: 주민등록번호 뒷자리(7번째 자리부터)를 기본 비밀번호로 사용
            String rawPassword = applyDto.getJumin().substring(6);
            String encodedPassword = passwordEncoder.encode(rawPassword);
            applyDto.setPassword(encodedPassword);

            // 3. STUDENT 테이블에 데이터 삽입 (암호화된 비밀번호 사용)
            applyMapper.insertStudent(applyDto);

            // 4. APPLY 상태 업데이트
            applyMapper.updateApplyStatus(id);

        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("학생 정보 저장 중 오류가 발생했습니다: " + e.getMessage());
        }

        return applyDto;
    }
}

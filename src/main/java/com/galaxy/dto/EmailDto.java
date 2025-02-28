package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDto {

    private String email;

    private String subject;

    private String msg;

    public EmailDto() {

    }

    public EmailDto(ApplyDto dto) {
        this.email = dto.getEmail();
        this.subject = "지원하신 강의 신청이 승인되었습니다.";
        String id = dto.getRoom() + dto.getRound() + dto.getSeq();
        this.msg = dto.getClass_name() + " 강의 신청이 승인되었습니다.<br/> " + "계정 : " + id
                + "으로 접속해서 확인할 수 있습니다.<br/>" + "최초 비밀번호는 지원서에 입력한 주민번호 뒤 7자리수 입니다.";
    }

}

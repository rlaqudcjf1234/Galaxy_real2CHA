package com.galaxy.dto;

import java.sql.Date;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureDocDto extends SeqDto{

    @NotNull
    private Long lecture_seq;

    private String title;

    private String division;

    private String detail;

    private String sort;

    private Date reg_dt;
    
}

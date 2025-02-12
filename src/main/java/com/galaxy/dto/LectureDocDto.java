package com.galaxy.dto;

import java.sql.Date;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureDocDto extends SeqDto{

    @NotNull
    private Long Lecture_seq;

    private String Title;

    private String Division;

    private String Detail;

    private Date reg_dt;

    private MultipartFile[] file;
    
}

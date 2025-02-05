package com.galaxy.dto;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LecDocumentDto extends SeqDto{

    @NotNull
    @NotBlank
    private Long Lecture_seq;

    private String Title;

    private String Division;

    private String Detail;

    private Date reg_dt;
    
}

package com.galaxy.dto;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimetableDto extends SeqDto{
    
    private Long class_seq;

    private Date daily;

    private String status;

}

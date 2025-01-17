package com.galaxy.dto;

import java.time.LocalDate;



import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ClassDto extends SeqDto {
    
    private int round;

    private String room;

    private LocalDate  start_dt;

    private LocalDate  end_dt;

    private String start_tm;

    private String end_tm;

    private int people;

    private LocalDate  reg_dt;

    private String use_yn;

    private LocalDate  confirm_dt;



}

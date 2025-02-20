package com.galaxy.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionItemDto {

    private String questionSeq;

    private Long sort;

    private String title;

    private String division;

    private String[] items;

    private String item;
}

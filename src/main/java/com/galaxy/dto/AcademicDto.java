package com.galaxy.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AcademicDto {
    private Integer studentSeq;
    private String finalSchoolName;
    private String finalSchoolLevel;
    private String finalSchoolSpeciality;
    private String finalSchoolLesson;
    private String graduateYn;
}

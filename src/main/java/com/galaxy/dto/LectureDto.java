package com.galaxy.dto;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureDto extends SeqDto {

        @NotNull
        @NotBlank
        private String name;

        @NotNull
        @NotBlank
        private Long admin_seq;

        private Date reg_dt;

        private List<Map<String, Object>> nameSearchResults;
        private List<Map<String, Object>> allSearchResults;

}

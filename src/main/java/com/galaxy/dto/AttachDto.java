package com.galaxy.dto;

import java.sql.Date;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttachDto extends SeqDto {

    @NotNull
    private Long row;
    @NotNull
    private String file_path;
    @NotNull
    private String file_origin_name;
    @NotNull
    private String file_save_name;
    @NotNull
    private Date use_yn;

}

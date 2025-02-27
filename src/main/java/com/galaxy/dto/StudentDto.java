package com.galaxy.dto;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StudentDto {

    private String jumin;
    private String name;
    private String real_zipcode;
    private String real_address1;
    private String real_address2;
    private String zipcode;
    private String adress1;
    private String adress2;
    private String email;
    private String phone;
    private String path;
    private String id;
    private String password;
    private Date reg_date;
    
    // 교실 정보 추가
    private String room;

    private String text;
    private Integer pageIndex;
    private Integer pageSize;
    
    // 필터링용 새 필드
    private String classSeq;
    private String lectureSeq;
    private String round;
    
    // 추가: 검색 조건(select) 필드
    private String select;

    public StudentDto(Map<String, Object> data) {
        this.jumin = (String) data.get("jumin");
        this.name = (String) data.get("name");
        this.real_zipcode = (String) data.get("real_zipcode");
        this.real_address1 = (String) data.get("real_address1");
        this.real_address2 = (String) data.get("real_address2");
        this.zipcode = (String) data.get("zipcode");
        this.adress1 = (String) data.get("adress1");
        this.adress2 = (String) data.get("adress2");
        this.email = (String) data.get("email");
        this.phone = (String) data.get("phone");
        this.path = (String) data.get("path");
        this.id = (String) data.get("id");
        this.password = (String) data.get("password");
        this.reg_date = (Date) data.get("reg_date");
        this.room = (String) data.get("room");
    }

    public static List<StudentDto> fromList(List<Map<String, Object>> list) {
        List<StudentDto> studentDtos = new ArrayList<>();
        for (Map<String, Object> data : list) {
            studentDtos.add(new StudentDto(data));
        }
        return studentDtos;
    }

    public String getFormattedPhone() {
        if (phone != null && phone.length() == 11) {
            return phone.replaceAll("(\\d{3})(\\d{4})(\\d{4})", "$1-$2-$3");
        }
        return phone;
    }

    public String getFormattedDate() {
        if (reg_date != null) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            return sdf.format(reg_date);
        }
        return "";
    }
}

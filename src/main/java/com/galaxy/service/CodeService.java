package com.galaxy.service;

import java.util.List;
import java.util.Map;

public interface CodeService {

    List<Map<String, Object>> selectUseCode(int code_id) throws Exception;
    
    List<Map<String, Object>> selectUse1() throws Exception;
    
    List<Map<String, Object>> selectUse2() throws Exception;

}

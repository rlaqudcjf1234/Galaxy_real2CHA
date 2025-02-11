package com.galaxy.util;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class HttpSessionUtil {

    @Autowired HttpServletRequest request;

    public String getLoginSeq() {

        String seq = "";

        try {
            HttpSession session = request.getSession();

            Map<String, Object> user = (Map<String, Object>) session.getAttribute("user");

            seq = (String) user.get("SEQ");

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        return seq;
    }
    
}

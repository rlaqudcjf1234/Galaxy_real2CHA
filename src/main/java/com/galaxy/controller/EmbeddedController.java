package com.galaxy.controller;

import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.matrix.service.AudSessionService;
import com.matrix.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Controller
@RequestMapping(value = "/embedded")
public class EmbeddedController {

	@GetMapping("/iaudEmbedded")
	public String iaudEmbedded(HttpServletRequest request, HttpServletResponse response,
			Model model) throws Exception {
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		/*********************************************
		 * 사용자 설정 영역 serverUrl: AUD7 플랫폼 matrix 서버 주소 (사이트별로 상이하다) user_id : 임베디드 시 연동할 유저코드 is_ssl
		 * : serverUrl이 https 인 경우에 true로 설정
		 **********************************************/
		String serverUrl = request.getParameter("audServerUrl");
		if (serverUrl == null || serverUrl == "") {
			System.out.print("audServerUrl check .. ");
			return null;
		}
		System.out.println("serverUrl: " + serverUrl);

		/*********************************************
		 * 사용자 코드에 대한 커스텀 방법 userCode : 사이트에서 userCode를 확인할 수 있는 정보 (ex:암호화된 key 등) 자체적은 sso 모듈을 통해
		 * 전달한 userCode를 복호화 처리 하여 AUD7플랫폼에 등록된 평문 userCode르 설정한다.
		 **********************************************/
		String userCode =
				request.getParameter("userCode") != null ? request.getParameter("userCode")
						: "galaxy";

		String rCode = request.getParameter("rCode");
		String showTitle = request.getParameter("sTitle");
		request.setAttribute("aud7_server_url", serverUrl);
		request.setAttribute("is_ssl", false);
		request.setAttribute("user_id", userCode);
		// 0. 쿠키에 AUD7 인증 token이 존재하는지 확인한다.

		// 1. AUD7 플랫폼용 token을 발생한다.
		String aud7Token = null;
		try {
			aud7Token = new TokenService().execute(request, response);
			System.out.println("aud7Token: " + aud7Token);
		} catch (Exception e) {
			System.out.print(e.getMessage());
			return null;
		}

		// 2. 인증정보에 저장된 path 일부 항목을 조회하여 script를 import 한다.
		request.setAttribute("token", aud7Token);
		Map<String, String> audSessionInfo = null;
		try {
			audSessionInfo = new AudSessionService().execute(request, response);
			System.out.println("audSessionInfo: " + audSessionInfo);
		} catch (Exception e) {
			System.out.print(e.getMessage());
			return null;
		}
		String AUD7_FULL_PATH = audSessionInfo.get("AUD7_FULL_PATH");
		String AUD7_SKIN_CSS_PATH = audSessionInfo.get("AUD7_SKIN_CSS_PATH");
		String CUSTOM_PARAM = audSessionInfo.get("CUSTOM_PARAM");
		String PORTAL_THEME_CSS_PATH = audSessionInfo.get("PORTAL_THEME_CSS_PATH");

		model.addAttribute("serverUrl", serverUrl);
		model.addAttribute("userCode", userCode);
		model.addAttribute("rCode", rCode);
		model.addAttribute("showTitle", showTitle);
		model.addAttribute("aud7Token", aud7Token);

		model.addAttribute("AUD7_FULL_PATH", AUD7_FULL_PATH);
		model.addAttribute("AUD7_SKIN_CSS_PATH", AUD7_SKIN_CSS_PATH);
		model.addAttribute("CUSTOM_PARAM", CUSTOM_PARAM);
		model.addAttribute("PORTAL_THEME_CSS_PATH", PORTAL_THEME_CSS_PATH);

		return "embedded/iaudEmbedded";

	}

}

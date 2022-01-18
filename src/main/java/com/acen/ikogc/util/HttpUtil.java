package com.acen.ikogc.util;

import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class HttpUtil {

	//접속 아이피를 가져온다.
	public static String getClientIp() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		return getClientIp(request);
	}
	public static String getClientIp(HttpServletRequest request) {
		String clientIp = "";
		if(request != null) {
			clientIp = request.getHeader("X-Forwarded-For");
			if (StringUtils.isEmpty(clientIp) || "unknown".equalsIgnoreCase(clientIp)) {
				clientIp = request.getHeader("Proxy-Client-IP");
			}
			if (StringUtils.isEmpty(clientIp) || "unknown".equalsIgnoreCase(clientIp)) {
				clientIp = request.getHeader("WL-Proxy-Client-IP");
			}
			if (StringUtils.isEmpty(clientIp) || "unknown".equalsIgnoreCase(clientIp)) {
				clientIp = request.getHeader("HTTP_CLIENT_IP");
			}
			if (StringUtils.isEmpty(clientIp) || "unknown".equalsIgnoreCase(clientIp)) {
				clientIp = request.getHeader("HTTP_X_FORWARDED_FOR");
			}
			if (StringUtils.isEmpty(clientIp) || "unknown".equalsIgnoreCase(clientIp)) {
				clientIp = request.getRemoteAddr();
			}
		}
		return clientIp;
	}

}

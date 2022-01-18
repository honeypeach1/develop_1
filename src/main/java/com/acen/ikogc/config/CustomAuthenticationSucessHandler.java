package com.acen.ikogc.config;


import com.acen.ikogc.common.Result;
import com.acen.ikogc.dao.MemberDao;
import com.acen.ikogc.domain.Member;
import com.acen.ikogc.util.HttpUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class CustomAuthenticationSucessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    public final Integer SESSION_TIMEOUT_IN_SECONDS = 0;


    @Autowired
    MemberDao memberDao;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        request.getSession().setMaxInactiveInterval(SESSION_TIMEOUT_IN_SECONDS);

        Member member = new Member();
        member.setId(request.getParameter("id"));
        member.setClientIp(HttpUtil.getClientIp(request));
        member.setUseragent(request.getHeader("User-Agent"));
        member.setSuccessYn(Boolean.TRUE);
        member.setRegDate(new Date());
        memberDao.insertLoginLog(member);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        OutputStream outputStream = response.getOutputStream();
        Map<String, Object> result = new HashMap<>();
        result.put("result", Result.SUCCESS.getValue());
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(outputStream, result);


    }
}

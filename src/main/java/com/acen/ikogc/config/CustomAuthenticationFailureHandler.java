package com.acen.ikogc.config;

import com.acen.ikogc.common.Result;
import com.acen.ikogc.dao.MemberDao;
import com.acen.ikogc.domain.Member;
import com.acen.ikogc.util.HttpUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {


    @Autowired
    MemberDao memberDao;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {


        Member member = new Member();
        member.setId(request.getParameter("id"));
        member.setClientIp(HttpUtil.getClientIp(request));
        member.setUseragent(request.getHeader("User-Agent"));
        member.setSuccessYn(Boolean.FALSE);
        member.setRegDate(new Date());
        memberDao.insertLoginLog(member);


        try {
            //로그인 실패 시 1초간 대기
            Thread.sleep(1000);
        } catch (InterruptedException e1) {
            e1.printStackTrace();
        }
        OutputStream outputStream = response.getOutputStream();
        Map<String, Object> result = new HashMap<>();
        result.put("result", Result.FAIL.getValue());
        result.put("message", e.getMessage());
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(outputStream, result);
    }

}

package com.acen.ikogc.serivce;

import com.acen.ikogc.common.ErrorMessage;
import com.acen.ikogc.dao.MemberDao;
import com.acen.ikogc.domain.Member;
import com.acen.ikogc.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("customAuthenticationProvider")
public class CustomAuthenticationProvider implements AuthenticationProvider {


	@Autowired
    Environment environment;


    @Autowired
    MemberDao memberDao;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberService memberService;

    @Override
    @Transactional
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String id = (String) authentication.getPrincipal();

        String password = (String) authentication.getCredentials();

        Member member = memberDao.getMember(id);

        //회원유무 확인
        if(member == null) {
            throw new BadCredentialsException(ErrorMessage.AUTHENTICATION_MEMBER_NOT_EXISTS.getMessage());
        }
        if(!passwordEncoder.matches(password, member.getPassword())) {
            throw new BadCredentialsException(ErrorMessage.AUTHENTICATION_MEMBER_NOT_EXISTS.getMessage());
        }

        if(!member.getUseYn().equals("Y")) {
            throw new BadCredentialsException(ErrorMessage.ID_UNRECEIVED.getMessage());
        }

        User user = (User) memberService.loadUserByUsername(id);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, password,user.getAuthorities());

        return authenticationToken;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}

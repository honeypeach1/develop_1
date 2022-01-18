package com.acen.ikogc.domain;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Date;

@Getter
public class User extends org.springframework.security.core.userdetails.User {

    private Integer memberNo;
	private String name;
	private Date regDate;

    public User(int memberNo, String id, String password, String name, Date regDate, Collection<? extends GrantedAuthority> authorities) {
        super(id, StringUtils.isEmpty(password) ? "N/A" : password, authorities);

        this.memberNo = memberNo;
	    this.name = name;
	    this.regDate = regDate;
    }

}

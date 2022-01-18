package com.acen.ikogc.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;

/**
 * Created by shin on 2019-06-20.
 */

@Getter @Setter
@ToString
public class Member {

    private Integer memberNo; //회원번호

    private String id; //회원 아이디

    @JsonIgnore
    private String password; //회원 비밀번호

    private String name; //이름

    private String tel; //전화번호

    private String useYn; //사용 여부

    private int reles; //권한

    private String clientIp; //IP

    private String useragent; //브라우저의 useragent

    private Date regDate; //등록일

    private Boolean successYn; //성공여부

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

}

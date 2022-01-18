package com.acen.ikogc.common;

import lombok.Getter;

@Getter
public enum ErrorMessage {

    SYSTEM_ERROR("시스템 오류가 발생하였습니다."),
    INVALID_PATH("잘못 된 경로로 접근하셨습니다."),
    AUTHENTICATION_MEMBER_NOT_EXISTS("회원정보가 없습니다."),
    ID_ALREADY_EXISTS("이미 등록되어 있는 아이디입니다"),
    ID_UNRECEIVED("미승인 아이디 입니다. 관리자에게 문의하시길 바랍니다."),
    CURRENT_PASSWORD_DO_NOT_MATCH("현재 비밀번호가 일치하지 않습니다."),
    ONLY_YOU_CAN_DELETE_IT("본인것만 삭제가능합니다."),
    EXCEL_NO_ROW("1건 이상 등록해주세요."),
    BAD_DATA("잘못 된 데이터입니다."),
    WRONG_APPROACH("잘못 된 접근입니다."),
    NO_MATCH_AUTHENTICATION_NUMBER("인증번호가 일치하지 않습니다."),
    OTP_AUTHENTICATION_NOT_EXISTS("OTP 인증코드가 일치하지 않습니다."),
    //2021-02-16 BJKIM 추가
    NO_DATA_LIST("데이터가 존재하지 않습니다.");
    private String message;

    ErrorMessage(String message) {
        this.message = message;
    }

}

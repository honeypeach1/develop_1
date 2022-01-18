var targetErrorObjName;
$('form input').tooltipster({  // <-  USE THE PROPER SELECTOR FOR YOUR INPUTs
    trigger: 'custom', // default is 'hover' which is no good here
    onlyOne: false,    // allow multiple tips to be open at a time
    position: 'right'  // display the tips to the right of the element
});

$.validator.setDefaults({
    submitHandler: function(form) {
        form.submit();
    },
    onfocusout: function(a) {
        if (a.tagName === "TEXTAREA" || (a.tagName === "INPUT" && a.type != "file")) {
            a.value = $.trim(a.value)
        }
        try {
            $(a).tooltipster("hide")
        } catch (b) {}
    }
    ,
    success: function(a, c) {
        var b = $(c);
        if (b.attr("id") == "password") {
            return
        }
        try {
            $(c).tooltipster("hide")
        } catch (d) {}
    }
    ,
    errorPlacement: function(a, c) {
        try {
            $(c).tooltipster("hide")
        } catch (d) {}
        if ($(c).attr("name") != targetErrorObjName) {
            return
        }
        var f = $(c).data("lastError"),
            b = $(a).html();
        $(c).data("lastError", b);
        if (b !== "" && b !== f) {
            $(c).tooltipster("content", b)
        }
        $(c).tooltipster("show")
    }
    ,
    invalidHandler: function(c, b) {
        var a = $(b.errorList[0].element);
        targetErrorObjName = a.attr("name");
        a.focus()
    }
});
//
var msgs = {
    passwordString: "비밀번호는 영문자,숫자,특수문자 조합으로 입력해주세요"
    ,specialCharacter: "특수문자는 허용되지 않습니다"
    ,blank: "공백은 허용되지 않습니다"
    ,number: "숫자만 입력해주세요"
    ,tel:"전화번호형식이 아닙니다"
    ,email:"이메일형식이 아닙니다"
    ,id:"ID를 입력해주세요"
    ,equalTo:'같은 값을 입력해주세요'
    ,agreement:'이용약관에 동의해주세요'
    ,information:'개인정보 처리방침 동의 체크를 하셔야 합니다'
};
$.extend($.validator.messages, msgs);

$.validator.addMethod("agreement", function(c, b, d) {
    if($("input:checkbox[id='agreement']").is(":checked") == false){
        return false;
    }
    return true;
}, $.validator.messages.agreement);


$.validator.addMethod("information", function(c, b, d) {
    if($("input:checkbox[id='information']").is(":checked") == false){
        return false;
    }
    return true;
}, $.validator.messages.information);


$.validator.addMethod("email", function(c, b, d) {
    if (c.length == 0) {
        return true
    }
    var rule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!rule.test(c)) {
        return false;
    }
    return true;
}, $.validator.messages.email);

$.validator.addMethod("tel", function(c, b, d) {
    if (c.length == 0) {
        return true
    }
    var rule = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
    if(!rule.test(c)) {
        return false;
    }
    return true;
}, $.validator.messages.tel);

$.validator.addMethod("passwordString", function(c, b, d) {
    if (c.length == 0) {
        return true
    }
    var rule = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/;
    if(!rule.test(c)) {
        return false;
    }
    return true;
}, $.validator.messages.passwordString);

$.validator.addMethod("specialCharacter", function(c, b, d) {
    if (c.length == 0) {
        return true
    }
    var rule = /[.`~!@\#$%<>^&*\()\"\-=+_\’]/gi;
    if(rule.test(c)) {
        return false;
    }
    return true;
}, $.validator.messages.specialCharacter);

$.validator.addMethod("blank", function(c, b, d) {
    if (c.length == 0) {
        return true
    }
    var rule = /[\s]/g;
    if(rule.test(c)) {
        return false;
    }
    return true;
}, $.validator.messages.blank);



//dataTable 셋팅
$.extend( true, $.fn.dataTable.defaults, {
    "searching" : false
    ,"paging": true
    ,"bPaginate": true
    ,"responsive": true
/*    ,"language": {url: "/css/plugins/dataTables.Korean.json"}*/
    ,"language": {url: "/css/bjkim/dataTables.Korean_bjkim.json"}
    ,"processing": true
    ,"serverSide": true
    ,"rowCallback": function(row, data) {
        // $('[data-toggle="tooltip"]').tooltip();
    }, "drawCallback" : function(settings) {
        // $("#datatable").trigger("mbsc-refresh");
    }
} );
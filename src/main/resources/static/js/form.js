//form에 있는 모든 input, select의 값을 초기화
function initFormInput(form) {
    for(var i = 0; i < form.length; i++) {
        if("INPUT" == form[i].tagName) { //input type 중 text와 password의 값을 초기화
            var type = form[i].getAttribute("type");
            if("text" == type || "password" == type || "number" == type) {
                form[i].value = "";
            }else if("checkbox" == type) {
                $(form[i]).prop("checked", false).mobiscroll("refresh");
            }
        }
        // else if("SELECT" == form[i].tagName) { //selectbox의 option 중 empty('')를 가진 options으로 변경
        //     form[i].value = "";
        //     initMobiscroll();
        // }
        else if("TEXTAREA" == form[i].tagName) {
            form[i].value = "";
        }
    }
}

//form을 등록 form으로 셋팅
function setInsertForm(url, form, titleId, modalId) {
    initFormInput(form);

    form.action = url+"/insert";
    if(isEmpty(titleId)) titleId = "save_modal_title";
    if(isEmpty(modalId)) modalId = "save_modal";
    $("#" + titleId).html("등록");
    $('#' + modalId).modal("show");
}

//form을 수정 form으로 셋팅
function setUpdateForm(url, form, content, titleId, modalId) {
    initFormInput(form);
    for(var i = 0; i < form.length; i++) {
        if("INPUT" == form[i].tagName && form[i].type != "file" || "TEXTAREA" == form[i].tagName) {
            var name = form[i].name;
            if(!isEmpty(name)) {

                var value = eval("content."+name);
                if(form[i].type == "checkbox") {
                    $("input:checkbox[name="+name+"]").prop("checked", value).mobiscroll("refresh");
                }else {
                    if(value == 0) value += "";
                    if(!isEmpty(value)) {
                        form[i].value = value;
                    }
                }
            }
        }else if("SELECT" == form[i].tagName) {
            var name = form[i].name;
            var value = eval("content."+name);
            form[i].value = value;
            // initMobiscroll();
        }
    }
    form.action = url+"/update";

    if(isEmpty(titleId)) titleId = "save_modal_title";
    if(isEmpty(modalId)) modalId = "save_modal";
    $("#" + titleId).html("수정");
    $('#' + modalId).modal("show");
}

//datatable 리로드
function reload(target) {
    if(target == null) {
        if(typeof datatable != "undefined" && datatable != null) {
            datatable.ajax.reload(null, false);
        }
    }else {
        target.ajax.reload(null, false);
    }
}

//검색조건 리셋
function reset() {
    initFormInput(document.searchForm);
    reload();
}

function formSuccess(modalId, target) {
    if(isEmpty(modalId)) {
        modalId = "save_modal";
    }
    $("#" + modalId).modal("toggle");

    //메세지 보여주기
    mobiscroll.toast({
        message: "저장되었습니다.",
        color: 'success'
    });

    reload(target);
}

//체크박스 모두 체크
function checkAll(formId) {
    $("#" + formId + " input:checkbox").each(function() {
        $(this).prop("checked", true);
    });
}

//체크박스 모두 해제
function uncheckAll(formId) {
    $("#" + formId + " input:checkbox").each(function() {
        $(this).prop("checked", false);
    });
}
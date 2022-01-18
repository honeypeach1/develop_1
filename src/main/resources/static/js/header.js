/**
 * Created by bjkim on 2020-04-29.
 */

//헤더 성정탭 호출 함수
$(document).ready(function() {

});
$(document).click(function(e){
    if (!$(e.target).is('#setting')) {
//
        $("#settingDetail").offset({ top: 0, left: 0 });
        $("#settingDetail").css('display','none');
    }
});

var pageUrl = document.location.href;

function showSetting() {
    if(pageUrl.indexOf("/monitoring") != -1){
        getThresholdValue();
        $("#settingModal").modal("show");
    }else{
        alert("악취 탭에서만 설정이 가능합니다.");
    }
}

function showMapSetting() {
    if(pageUrl.indexOf("/monitoring") != -1){

        $("#settingMapModal").modal("show");

    }else{
        alert("악취 탭에서만 설정이 가능합니다.");
    }
}

function getThresholdValue() {
    var absoluteId = $('#wheel2').mobiscroll('getInst').getVal();
    $.ajax({
        url : '/ajaxmonitoring/thresholdValue/'+absoluteId,
        type : "get",
        dataType : "json",
        success : function(res) {
            initFormInput(document.setting_Form);
            var result = res['thresholdValueList'];
            for(var index in result) {
                var comId = result[index]['eventComId'];

                switch (result[index]['eventType']) {
                    case 1 : {
                        comId += "Error";
                        break;
                    }
                    case  2 : {
                        comId += "Warning";
                        break;
                    }
                }
                $("#"+comId).val(result[index]['thresholdValue']);
            }

        },
        error:function(e) {
            alert('데이터 초기화에 실패 하였습니다.')
        }
    });


}
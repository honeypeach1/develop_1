//툴팁메세지
$('form input').tooltipster({
    trigger: 'custom',
    onlyOne: false,
    position: 'right'
});

function showTooltipster(f, i, e, c, k, d, a, g) {
    function j() {
        try {
            $(f).tooltipster("destroy")
        } catch (l) {}
    }
    j();
    var b = (k) ? "click" : "custom";
    b = (g) ? "hover" : b;
    $(f).tooltipster({
        trigger: b,
        onlyOne: false,
        position: "top",
        contentAsHTML: true,
        interactive: true,
        theme: (e) ? "tooltipster-default " + e : "tooltipster-default"
    });
    if (i) {
        $(f).tooltipster("content", i)
    }
    if (c) {
        $(f).tooltipster("show")
    }
    if (k) {
        $(f).click(function() {
            $(".tooltipster-base").css("opacity", 0);
            j();
            $(f).off("click")
        })
    } else {
        $(f).on("click")
    }
    if (d > 0) {
        if (destoryTrigger) {
            clearTimeout(destoryTrigger)
        }
        destoryTrigger = setTimeout(function() {
            $(".tooltipster-base").css("opacity", 0);
            j();
            if (a) {
                redirectHandler(null, a)
            }
        }, d)
    }
}

function setting(id) {
    if($("#settingDetail").css('display')=='block') {
        $("#settingDetail").offset({ top: 0, left: 0 });
        $("#settingDetail").css('display','none');
    }
    else {
        var point = getOffset(id);
        point.top += 38;
        point.left -= 60;


        //1720
        $("#settingDetail").offset(point);
        $("#settingDetail").css('display','block');
    }
}


//공백여부
function isEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

//모든 단어 바꾸기
function replaceAll(str, searchStr, replaceStr) {
    if(isEmpty(str)) return "";
    else return str.split(searchStr).join(replaceStr);
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function windDirectionHan(wind) {
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\-]/;
    var windData;
    if(check.test(wind)) {
        windData = 0;
        return "-";
    }
    else {
        windData = parseInt(wind);
    }
    var result;
    if(windData <0 ) windData=0;
    else if(windData == 16) windData =0;
    switch (windData) {
        case 0: result="북";break;
        case 1: result="북북동";break;
        case 2: result="북동";break;
        case 3: result="동북동";break;
        case 4: result="동";break;
        case 5: result="동남동";break;
        case 6: result="남동";break;
        case 7: result="남남동";break;
        case 8: result="남";break;
        case 9: result="남남서";break;
        case 10: result="남서";break;
        case 11: result="서남서";break;
        case 12: result="서";break;
        case 13: result="서북서";break;
        case 14: result="북서";break;
        case 15: result="북북서";break;
    }
    return result;

}

function windSpeed(ows) {
    var windIcon;
    if(ows <0.2 ) {
        windIcon ="bw.png";
    }
    else if(ows < 1.5) {
        windIcon ="gw.png";
    }
    else if (ows < 3.3) {
        windIcon ="yw.png";
    }
    else if(ows < 5.4) {
        windIcon ="ow.png";
    }
    else {
        windIcon ="rw.png";
    }
    return windIcon;
}

function infoBoxDegree(wind) {
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\-]/;
    var degree;
    if(check.test(wind)) {
        wind = 0;
    }
    else {
        wind = parseInt(wind);
    }
    if(wind < 0) degree = 0;
    switch (wind) {
        case 0: degree=360;break;
        case 1: degree=22.5;break;
        case 2: degree=45;break;
        case 3: degree=67.5;break;
        case 4: degree=90;break;
        case 5: degree=112.5;break;
        case 6: degree=135;break;
        case 7: degree=157.5;break;
        case 8: degree=180;break;
        case 9: degree=202.5;break;
        case 10: degree=225;break;
        case 11: degree=247.5;break;
        case 12: degree=270;break;
        case 13: degree=292.5;break;
        case 14: degree=315;break;
        case 15: degree=337.5;break;
        case 16: degree=360;break;
    }
    degree +=180;
    return degree;
}

function windDegree(wind,url) {
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\-]/;
    var degree;
    if(check.test(wind)) {
        wind = 0;
    }
    else {
        if(wind == null){
            wind = 0;
        }else{
            wind = parseInt(wind);
        }
    }
    if(wind < 0) degree = 0;
    switch (wind) {
        case 0: degree=360;break;
        case 1: degree=22.5;break;
        case 2: degree=45;break;
        case 3: degree=67.5;break;
        case 4: degree=90;break;
        case 5: degree=112.5;break;
        case 6: degree=135;break;
        case 7: degree=157.5;break;
        case 8: degree=180;break;
        case 9: degree=202.5;break;
        case 10: degree=225;break;
        case 11: degree=247.5;break;
        case 12: degree=270;break;
        case 13: degree=292.5;break;
        case 14: degree=315;break;
        case 15: degree=337.5;break;
        case 16: degree=360;break;
    }

    window.clearInterval(directionTimer);
    var directionTimer = setTimeout(function(){
        var targetObj = $('img[src="'+url+'"]');
        var oldDegree = rotate_degree(targetObj.css('transform'));
        var rotateCnt = Math.abs(oldDegree-degree);
        var rotateDegree = (oldDegree-degree) <= 0 ? true: false;
        var moveWind = setInterval(function(){
            if(rotateCnt == 0 ) {
                clearInterval(moveWind);
            }
            else {
                if(rotateDegree) {
                    oldDegree+= 0.5;
                }
                else {
                    oldDegree-= 0.5;
                }
                targetObj.css({
                    'transform': 'rotate('+oldDegree+'deg)'
                });
                if(oldDegree == 0) {
                    oldDegree = 360;
                }
                rotateCnt -= 0.5;
            }
        },1);

    }, 500);

    window.clearInterval(directionTimer);
    var directionTimer = setInterval(function() {
        var targetObj = $('img[src="'+url+'"]');
        if(targetObj.length > 1) {
            window.clearInterval(directionTimer);
            var oldDegree = rotate_degree(targetObj.css('transform'));
            var rotateCnt = Math.abs(oldDegree-degree);
            var rotateDegree = (oldDegree-degree) <= 0 ? true: false;
            var moveWind = setInterval(function(){
                if(rotateCnt == 0 ) {
                    clearInterval(moveWind);
                }
                else {
                    if(rotateDegree) {
                        oldDegree+= 0.5;
                    }
                    else {
                        oldDegree-= 0.5;
                    }

                    targetObj.css({
                        'transform': 'rotate('+oldDegree+'deg)'
                    });
                    if(oldDegree == 0) {
                        oldDegree = 360;
                    }
                    rotateCnt -= 0.5;
                }
            },1);
        }


    },500);



}



function rotate_degree(matrix) {
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else {
        var angle = 360;
    }
    return (angle <= 0) ? angle +=360 : angle;
}

function windDirection(wind) {
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣\-]/;
    var windData;
    if(check.test(wind)) {
        windData = 0;
        // return "none";
    }
    else {
        if(wind == null){
            windData = 0;
        }else{
            windData = parseInt(wind);

        }
    }
    var result;
    if(windData <0 ) windData=0;
    else if(windData == 16) windData =0;
    switch (windData) {
        case 0: result="N";break;
        case 1: result="NNE";break;
        case 2: result="NE";break;
        case 3: result="ENE";break;
        case 4: result="E";break;
        case 5: result="ESE";break;
        case 6: result="SE";break;
        case 7: result="SSE";break;
        case 8: result="S";break;
        case 9: result="SSW";break;
        case 10: result="SW";break;
        case 11: result="WSW";break;
        case 12: result="W";break;
        case 13: result="WNW";break;
        case 14: result="NW";break;
        case 15: result="NNW";break;
    }

    return result;
}



function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

//복합악취 등급표
function getGrade(seq,value,data) {

    var result;

    // if(value == "통신점검" || value == "-" || value == "점검") {
    if(isNaN(parseInt(value))) {
        return result = "-";
    }else{
        result = '<img src="/img/acenicon/grade/normal.png"/>';
    }


    //var result = '-';

    for(var index in  data) {
        var thresholdId = data[index]['absoluteId'];


        if(thresholdId == seq &&  data[index]['eventComId'] == 'TOD') {

            //경고값
            if(data[index]['eventType'] == 1) {
                if(data[index]['thresholdValue']<value) {
                    result = '<img src="/img/acenicon/grade/error.png"/>';
                }
            }

            //주의값
            if(data[index]['eventType'] == 2) {
                if(result == '<img src="/img/acenicon/grade/normal.png"/>' && data[index]['thresholdValue']<=value) {
                    result = '<img src="/img/acenicon/grade/warning.png"/>';
                }
            }
        }
    }
    return result;
}

function fn(str){
    var res;
    res = str.replace(/[^0-9\\.]/g,"");
    return res;
}

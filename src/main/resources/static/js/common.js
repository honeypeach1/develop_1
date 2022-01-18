 /**
  * 쿠키값 추출
  * @param cookieName 쿠키명
  */
 function getCookie( cookieName )
 {
  var search = cookieName + "=";
  var cookie = document.cookie;

  // 현재 쿠키가 존재할 경우
  if( cookie.length > 0 )
  {
   // 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
   startIndex = cookie.indexOf( cookieName );

   // 만약 존재한다면
   if( startIndex != -1 )
   {
    // 값을 얻어내기 위해 시작 인덱스 조절
    startIndex += cookieName.length;

    // 값을 얻어내기 위해 종료 인덱스 추출
    endIndex = cookie.indexOf( ";", startIndex );

    // 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
    if( endIndex == -1) endIndex = cookie.length;

    // 쿠키값을 추출하여 리턴
    return unescape( cookie.substring( startIndex + 1, endIndex ) );
   }
   else
   {
    // 쿠키 내에 해당 쿠키가 존재하지 않을 경우
    return false;
   }
  }
  else
  {
   // 쿠키 자체가 없을 경우
   return false;
  }
 }

 

 /**
  * 쿠키 설정
  * @param cookieName 쿠키명
  * @param cookieValue 쿠키값
  * @param expireDay 쿠키 유효날짜
  */
 function setCookie( cookieName, cookieValue, expireDate )
 {
  var today = new Date();
  today.setDate( today.getDate() + parseInt( expireDate ) );
  document.cookie = cookieName + "=" + escape( cookieValue ) + "; path=/; expires=" + today.toGMTString() + ";";
 }
 /**
  * 쿠키 삭제
  * @param cookieName 삭제할 쿠키명
  */
 function deleteCookie( cookieName )
 {
  var expireDate = new Date();
  
  //어제 날짜를 쿠키 소멸 날짜로 설정한다.
  expireDate.setDate( expireDate.getDate() - 1 );
  document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
 }

function deleteAllCookies() {
  var cookie = document.cookie.split(';');
  console.log(cookie);
  for (var i = 0; i < cookie.length; i++) {
    var chip = cookie[i],
    entry = chip.split("="),
    name = entry[0];
    deleteCookie(name);
  }
}
 /**
  * 레벨 체크
  * @param incharge 담당
  */
function checkLevel(incharge){
  var lv = 0;
  switch(incharge) {
    case "관리자":
      lv = 2;
      break;
    case "모니터":
      lv = 1;
      break;
  }
  return lv;
}


function getColor(w){
  var color;
  if(w < 1){
    color="#07ABFF";
  }else if(w < 2 ){
    color="#00D500";
  }else if(w < 3){
    color="#FFFF00";
  }else if(w < 4){
    color="#FF9C00";
  }else if(w < 5){
    color="#E84A56";
  }else{
    color="#CD1F25";
  }
  return color;
}

function getKindName(w){
  var txt = "";
  var notxt = "";
  switch(w) {
    case "1":
      txt = "구린";
      break;
    case "2":
      txt = "음식물";
      break;
    case "3":
      txt = "고무";
      break;
    case "4":
      txt = "기름";
      break;
    case "5":
      txt = "페인트";
      break;
    case "6":
      txt = "사료";
      break;
    case "7":
      txt = "쇠가공";
      break;
    case "8":
      txt = "화학약품";
      break;
    case "9":
      txt = "폐기물소각";
      break;
    case "10":
      txt = "불쾌한 분뇨";
      break;
    case "11":
      txt = "하수구";
      break;
    case "12":
      txt = "나무/종이";
      break;
    default:
      notxt = " 없음";
      break;
  }
  return txt+" 냄새" + notxt;
}

function getDoNum(s){
  var regex = /[^0-9]/g;
  return s.replace(regex, '');
}

function getDoName(n){
  var txt = "";
  switch(n) {
    case "0":
      txt = "무취(None) / 평상시에 감지하지 못함";
      break;
    case "1":
      txt = "감지 취기(Threshold) / 최소감지 농도";
      break;
    case "2":
      txt = "보통 취기(Moderate) / 최소 인지 농도";
      break;
    case "3":
      txt = "강한 취기(Strong) / 병원의 크레졸 냄새 수준";
      break;
    case "4":
      txt = "금식함 취기(Very strong) / 재래식 화장식 냄새 수준";
      break;
    case "5":
      txt = "참기 힘든 취기(Over strong) / 숨을 쉴 수 없을 정도의 수준";
      break;
  }
  return txt;
}

function getDegree(n){

  return (180+n*22.5);
}


function getTimeFormat(t){
  var txt = " ";
  var h = parseInt(t/60);
  var m = parseInt(t%60);

  if(h){
    txt += h+"시간 "; 
  }
  if(m){
    txt += m+"분 ";
  }
  return txt;
}
function getDateFormat(t){
  var yyyy = t.substr(0,4);
  var mm = t.substr(4,2);
  var dd = t.substr(6,2);
  var h = t.substr(8,2);
  var m = t.substr(10,2);
  var txt =  yyyy+"-"+mm+"-"+dd+" "+h+":"+m;

  return txt;
}



function getCircle(s) {
  var circle = {
    path: google.maps.SymbolPath.CIRCLE,

    fillColor: '#00FFFF',
    fillOpacity: .9,
    scale: Math.pow(2, s) / 2,
    strokeColor: 'white',
    strokeWeight: .5,
  };
  return circle;
}
function getArrow(c,r) {
  var circle = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,

    fillColor: c,
    fillOpacity: .7,
    scale: Math.pow(2, 3.5) / 2,
    strokeColor: 'white',
    strokeWeight: .5,
    rotation:r
  };
  return circle;
}

function getWDName(n){
  var txt = "";
  switch(n) {
    case "0":
      txt = "북";
      break;
    case "1":
      txt = "북북동";
      break;
    case "2":
      txt = "북동";
      break;
    case "3":
      txt = "동북동";
      break;
    case "4":
      txt = "동";
      break;
    case "5":
      txt = "동남동";
      break;
    case "6":
      txt = "남동";
      break;
    case "7":
      txt = "남남동";
      break;
    case "8":
      txt = "남";
      break;
    case "9":
      txt = "남남서";
      break;
    case "10":
      txt = "남서";
      break;
    case "11":
      txt = "서남서";
      break;
    case "12":
      txt = "서";
      break;
    case "13":
      txt = "서북서";
      break;
    case "14":
      txt = "북서";
      break;
    case "15":
      txt = "북북서";
      break;
  }
  //console.log(n + "|" +txt);
  return txt;
}


<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jspf/tags.jspf" %>
<meta name="_csrf" content="${_csrf.token}"/>
<header class="headerArea">
    <img id="headImg" src="/img/acenicon/logo/acen_logo.png" onclick="location.href='/'" alt="ACEN"/>
</header>
<div class="equipContent">
    <div class="juminOutBoxArea">
        <%--데이터 입력 영역(상단)--%>
        <div class="fileStreamTopArea">
            <div class="TopAreaContentDiv"></div><br>
            <div class="TopAreaDiv">
                <div class="pickDateArea">
                    시작일 : <input name="minDate" id="minDate" type="text" readonly>
                    종료일 : <input name="maxDate" id="maxDate" type="text" readonly>
                </div>
                <div class="fileSelectArea">
                    <input multiple="multiple" name="fileData[]" id="fileData" type="file" onchange="readFile()"/>
                    <div class="contentDiv">* 장비에서 제공하는 가공하지 않은 순수 텍스트 파일만 사용 가능 합니다.</div>
                </div>
            </div>
            <div class="TopDownAreaDiv">
                <ul>
                    <li>
                        <a href="#" class="option">
                            <img src="/img/acenicon/print_3838.png" onclick="tablePrint()"/>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="option">
                            <img src="/img/acenicon/excelDown.png" onclick="tableExcel()"/>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="option">
                            <div class="fileToggle" id="fileToggle">테이블 상세 보기</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <%--데이터 출력 영역(중간 테이블 영역)--%>
        <div class="fileStreamCenterArea">
            <div class="juminInforDivArea">
                <table class="juminTableArea" id="fileDataTable">
                    <thead>
                        <tr>
                            <%--<th class="fileStreamHeader" id="fileStreamHeader_0">번호</th>--%>
                            <th class="fileStreamHeader" id="fileStreamHeader_1">시간</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_2">장비명</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_3">시간 타입</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_4">복합 악취</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_5">MOS</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_6">VOC</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_7">황화수소</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_8">암모니아</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_9">외부 온도</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_10">외부 습도</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_11">풍향</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_12">풍속</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_13">내부 온도</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_14">밧데리 전압</th>
                            <th class="fileStreamHeader" id="fileStreamHeader_15">진공 센서</th>
                        </tr>
                    </thead>
                    <%--<tbody>
                    <tr>
                       <td class="fileStreamBody" id="fileStream" colspan="15">데이터가 없습니다.</td>
                    </tr>
                    </tbody>--%>
                </table>
            </div>
        </div>
        <%--데이터 시각화 그래프 영역(하단 차트 영역)--%>
        <div class="fileStreamBottomArea">
            <div class="IndexSelectArea">
                <select name="chartIndexNum" id="chartIndexList">
                    <option value="null" selected disabled>파일을 선택하십시오.</option>
                </select>
                <button onclick="getChartData()">보기</button>
            </div>
            <div class="plotlyBarChart" id="plotlyBarChart"></div>
        </div>
    </div>
</div>
<script>
    $(document).ready(function () {
        //input date에서 오늘 날짜를 max로 지정
        var date = new Date();
        var yyyy = date.getFullYear();
        var mm = date.getMonth()+1 > 9 ? date.getMonth()+1 : '0' + (date.getMonth()+1);
        var dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        $('.datePicker').attr('max',yyyy+'-'+mm+'-'+dd);

        $('input[name="managerMail"]').val($('#managerMail').text());
    });
</script>
<%--폐쇠망 사용으로 인한 url 소스 다운 웹 서버 내부 호출--%>
<script type="text/javascript" src="js/plugins/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="js/plugins/buttons.flash.min.js"></script>
<script type="text/javascript" src="js/plugins/jszip.min.js"></script>
<script type="text/javascript" src="js/plugins/pdfmake.min.js"></script>
<script type="text/javascript" src="js/plugins/vfs.fonts.js"></script>
<script type="text/javascript" src="js/plugins/buttons.html5.min.js"></script>
<script type="text/javascript" src="js/plugins/buttons.print.min.js"></script>

<%--Flotly 차트 생성 라이브러리--%>
<script type="text/javascript" src="js/plugins/plotly-2.2.0.min.js"></script>

<link rel="stylesheet" type="text/css" href="/css/plugins/dataTables.min.css">
<link rel="stylesheet" type="text/css" href="/css/plugins/buttons.dataTables.min.css"/>
<link rel="stylesheet" href="/css/plugins/c3.min.css"/>

<script src="/js/plugins/c3.min.js"></script>
<script src="/js/plugins/d3-5.4.0.min.js"></script>
<script src="/js/fileStream.js"></script>

<%--<script src="https://cdn.datatables.net/buttons/1.6.5/js/dataTables.buttons.min.js"></script>--%>
<%--<script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.flash.min.js"></script>--%>
<%--<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>--%>
<%--<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>--%>
<%--<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>--%>
<%--<script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.html5.min.js"></script>--%>
<%--<script src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.print.min.js"></script>--%>
<%--<link rel="stylesheet" href="https://cdn.datatables.net/t/bs-3.3.6/jqc-1.12.0,dt-1.10.11/datatables.min.css"/>--%>

<%--<link rel="stylesheet" type="text/css" href="/css/plugins/jquery.dataTables.min.css">--%>
<%--<link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css" />--%>
<%--<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.6.5/css/buttons.dataTables.min.css" />--%>
/*
* 2021-07-05
* bjkim 텍스트 파일 변환 출력 프로그램 제작
* 파일을 선택하여 버튼을 클릭하면 해당 파일을 불러와서 데이터테이블 형식으로 변환한다.
* 또한 해당 파일에 대한 셀렉트 처리(기간 선택) 가능하게 하고, 해당 리턴에 대한 로우값들을 그래프를 그린다.
* */

//PeriodStyle 시간 타입(1분 평균 ~ 1일 평균,차트 동적 생성을 위해서 전역 선언)
let timeType;
let mDataTable;
let charList = [];

//2021-07-12
//csrf 토큰 추가 bjkim, 해당 토큰 없을시 ajax 통신 에러 발생
var csrfToken = $("meta[name='_csrf']").attr("content");
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    if (options['type'].toLowerCase() === "post") {
        jqXHR.setRequestHeader('X-CSRF-TOKEN', csrfToken);
    }
});


$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        var valid = true;
        var min = moment($("#minDate").val());
        if (!min.isValid()) { min = null; }

        var max = moment($("#maxDate").val());
        if (!max.isValid()) { max = null; }

        if (min === null && max === null) {
            // no filter applied or no date columns
            valid = true;
        }
        else {
            $.each(settings.aoColumns, function (i, col) {
                if (col['sTitle'] == '시간') {
                    var cDate = moment(data[i]);
                    if (cDate.isValid()) {
                        if (max !== null && max.isBefore(cDate)) {
                            valid = false;
                        }
                        if (min !== null && cDate.isBefore(min)) {
                            valid = false;
                        }
                    }
                    else {
                        valid = false;
                    }
                }
            });
        }
        return valid;
    });

$(document).ready(function () {
    $("#minDate").datepicker({
        "onSelect": function(date) {
            minDateFilter = new Date(date).getTime();
            $('#fileDataTable').DataTable().draw();
            getChartData();
        }
    });

    $("#maxDate").datepicker({
        "onSelect": function(date) {
            maxDateFilter = new Date(date).getTime();
            $('#fileDataTable').DataTable().draw();
            getChartData();
        }
    });

    initDataTable();
});

function readFile() {
    var ck = null;
    /*
        BJKIM 2021-07-15 작성
        한국환경공단 용 텍스트 파일 컬럼 지정
        불러오는 텍스트 파일 컬럼 설명
        1. DataDateTime - 시간
        2. AbsoluteID - 장비 번호
        3. PeriodStyle - 시간별 테이블 번호(1분 - 1, 5분 - 2, 10분 - 3, 1시간 - 4, 1일 - 5)
        4. TOD - 복합악취
        5. SS1(MOS) : MOS(복합악취 센서, Metal Oxide Semiconductor)
        6. TV1(VOC) : TVOC(총 휘발성 유기 화합물)
        7. TH1 : 황화수소
        8. TN1 : 암모니아
        9. OTT : 외부 온도
        10. OTH : 외부 습도
        11. OWD : 풍향
        12. OWS : 풍속
        13. ITT : 내부 온도
        14. BTV : 밧데리 전압
        15. VSD : 진공 센서
    */

    const target = document.getElementsByName('fileData[]');
    const fileLength = target[0].files.length;
    if (fileLength<1) return;
    $.each(target[0].files, function(index, file){
        if(file['name'].split('.').pop().toLowerCase() == 'txt'){
            const reader = new FileReader();
            var index = [];
            var list = [];
            reader.onload = function(e) {
                fileData = e.target.result;
                ck += fileData;
                var text = ck;

                //띄어쓰기별 데이터 로우 저장
                var lines = text.split('\n');

                //2차원 배열의 내부 데이터 쪼개서 배열 생성
                for(var line = 1; line < lines.length; line++){
                    //각 로우별 띄어쓰기 데이터 배열
                    if(!(Array.isArray(line[line]) && line[lines].length === 0)){
                        value = lines[line].split("\t");
                        if(value[2] == 1){
                            value[2] = '1분 평균';
                        }else if(value[2] == 2){
                            value[2] = '5분 평균';
                        }else if(value[2] == 3){
                            value[2] = '10분 평균';
                        }else if(value[2] == 4){
                            value[2] = '1시간 평균';
                        }else if(value[2] == 5){
                            value[2] = '1일 평균';
                        }
                        //길이값을 15로 고정하고, 배열의 맨 뒤 \r 값 삭제하기
                        //value.length = 15;
                        //value[0] != 'DataDateTime' -> 텍스트 파일을 여러개 불러올 경우,
                        //텍스트 파일간 제목도 같이 리스트로 불러옴. 해당 리스트를 제외하고 순수 데이터만 설정
                        if(value.length == 15 && value[0] != 'DataDateTime'){
                            list.push(value);

                            //장비 인덱스 중복 제거 배열 생성(차트 구분 셀렉트 리스트 구현)
                            index.push(value[2])
                        }
                    }
                }
                list = list.sort();
                const set = new Set(index)
                const uniqueArr = [...set];
                Array.isArray(uniqueArr);
                //셀렉트 리스트 생성하기 함수 호출
                makeChartIndexSelectList(uniqueArr);
                charList = list;

                console.log("charList : ",charList.length)

                //리스트 정보 확인 콘솔
                //console.log("list : ",list)

                try {
                    $.ajax({
                        url: '/getListData',
                        type: "POST",
                        cache: false,
                        dataType: "json",
                        data: JSON.stringify(list),
                        contentType: 'application/json',
                        success: function (res) {
                            console.log("성공")
                        },
                        error: function (e) {
                            console.log("error : ", e)
                        }
                    });
                }catch (e) {
                    console.log("데이터 베이스 저장 에러가 발생하였습니다. 파라미터 list를 확인하세요.")
                }
                mDataTable.clear();
                mDataTable.rows.add(list);
                mDataTable.draw();
            }
            reader.readAsText(file, 'euc-kr');
        }else{
            alert('선택한 파일 또는 파일중 텍스트 파일이 아닙니다. 텍스트 파일만 출력합니다.')
        }
    });
}

//텍스트 파일 장비 인덱스 받아서 셀렉트 생성하기 함수
function makeChartIndexSelectList(uniqueArr){
    if(uniqueArr.length != 0){
        $("#chartIndexList option[value='null']").remove();
        $("#chartIndexList option").remove();
        //첫번째 옵션 삭제하기 -> 파일을 선택하십시오.
        uniqueArr.forEach((n)=>{
            $("#chartIndexList").append('<option value="'+n+'">'+n+' 데이터</option>');
        })
    }else{
        //배열이 없음.
    }
}

function getChartData(){
    if($("#chartIndexList option:selected").val() != null){
        timeType = $("#chartIndexList option:selected").val();
        generateLineChart(timeType);
    }
}

/*파일 이름 가져와 추출*/
/*function fileInfor() {
        //input file 태그.
        var file = document.getElementById('fileData');
        //파일 경로.
        var filePath = file.value;
        //전체경로를 \ 나눔.
        var filePathSplit = filePath.split('\\');
        //전체경로를 \로 나눈 길이.
        var filePathLength = filePathSplit.length;
        //마지막 경로를 .으로 나눔.
        var fileNameSplit = filePathSplit[filePathLength-1].split('.');
        //파일명 : .으로 나눈 앞부분
        var fileName = fileNameSplit[0];
        //파일 확장자 : .으로 나눈 뒷부분
        var fileExt = fileNameSplit[1];
        //파일 크기
        var fileSize = file.files[0].size;

        // console.log('파일 경로 : ' + filePath);
        // console.log('파일명 : ' + fileName);
        // console.log('파일 확장자 : ' + fileExt);
        // console.log('파일 크기 : ' + fileSize);
        return fileName;
}*/

//상세 보기 구현
$(function () {
    $('#fileToggle').click(function () {
        if ($('#fileToggle').attr('data-click-state') == 0) {
            $('.fileToggle').text('테이블 상세 보기');
            $('#fileToggle').attr('data-click-state', 2);
            $(".fileStreamCenterArea").css("display", "block");
            $(".fileStreamCenterArea").css("height", '455px');
            $(".fileStreamBottomArea").css("height", '252px');

            //데이터 테이블 출력 로우수 변경(기본 8줄)
            $("#fileDataTable").DataTable().page.len(8).draw();
            //차트 다시 불러오기
            getChartData();
        } else if($('#fileToggle').attr('data-click-state') == 1){
            //두 번째 클릭시 차트 확장 보기
            $('.fileToggle').text('전체 보기');
            $('#fileToggle').attr('data-click-state', 0);
            $(".fileStreamCenterArea").css("display", 'none');
            $(".fileStreamBottomArea").css("display", 'block');
            $(".fileStreamBottomArea").css("height", '705px');

            //차트 다시 불러오기
            getChartData();
        } else {
            //첫 클릭시 테이블 영역 확장 보기
            $('.fileToggle').text('차트 상세 보기');
            $('#fileToggle').attr('data-click-state', 1);
            $(".fileStreamCenterArea").css("height", '715px');
            $(".fileStreamBottomArea").css("display", 'none');

            //데이터 테이블 출력 로우수 변경(기본 8줄)
            $("#fileDataTable").DataTable().page.len(15).draw();
        }
    })
})

//처음 페이지 진입시 데이터테이블 생성
function initDataTable(){
    mDataTable = $("#fileDataTable").DataTable({
        serverSide: false,
        searching:true,
        pageLength: 8,
        bLengthChange: false,
        autoWidth : false,  // true로 설정하면, 오히려 DataTables 플러그인에서 컬럼 폭을 정해버린다.
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel'
                ,text: '엑셀출력'
                ,filename: 'EXPORTDATA_엑셀'
                ,title: 'EXPORTDATA_엑셀'
            },
            {
                extend: 'csv'
                ,text: 'csv출력'
                // ,filename: 'utf-8이라서 ms엑셀로 바로 열면 글자 깨짐'
            },
            {
                extend: 'print'
                ,text: '인쇄'
                ,title: 'EXPORTDATA_데이터'
            },
        ]
    });
    $(".dt-buttons").hide();
}


function tablePrint() {$(".buttons-print").click();}
function tableExcel() {$(".buttons-excel").click();}

//차트 데이터 생성하기
function generateLineChart(timeType) {
    Chart.defaults.global.defaultFontColor = "#fff";
    Chart.defaults.global.elements.point.radius = 0.5
    Chart.defaults.global.elements.point.hitRadius = 20
    Chart.defaults.global.elements.point.hoverBorderWidth = 4

    let dateList = [];
    let todList = [];
    let mosList = [];
    let tvocList = [];
    let h2sList = [];
    let nh3List = [];
    let index = 0;



    //정렬(텍스트 파일을 가져오면 정렬이 안되어있음)
    for(var i = 0; i < charList.length; i++){
        if(charList[i][2] == timeType){
            dateList[index] = charList[i][0].substring(0,4) + "-" + charList[i][0].substring(4,6) + "-" + charList[i][0].substring(6,8) + " " + charList[i][0].substring(8,10) + ":" + charList[i][0].substring(10,12);
            todList[index] = (charList[i][3] < 0 ? 0:charList[i][3]);
            mosList[index] = (charList[i][4] < 0 ? 0:charList[i][4]);
            tvocList[index] = (charList[i][5] < 0 ? 0:charList[i][5]);
            h2sList[index] = (charList[i][6] < 0 ? 0:charList[i][6]);
            nh3List[index] = (charList[i][7] < 0 ? 0:charList[i][7]);
            index++;
        }
    }

    //floty 차트 가져오기
    //x축 시간 데이터
    //y축 데이터 수치
    var tod = {
        x: dateList,
        y: todList,
        type: 'scatter',
        name: 'TOD',
        hovertemplate : '복합악취'
    };

    var mos = {
        x: dateList,
        y: mosList,
        text:"mos",
        type: 'scatter',
        name: 'MOS',
        hovertemplate : 'MOS'
    };

    var tvoc = {
        x: dateList,
        y: tvocList,
        type: 'scatter',
        name: 'VOC',
        hovertemplate : 'VOC'
    };

    /*해당 데이터 차트 표시시 주석 해제*/
   /* var nh3 = {
        x: dateList,
        y: nh3List,
        type: 'scatter',
        name: "NH<sub>3</sub>",
        hovertemplate : 'NH3'
    };

    var h2s = {
        x: dateList,
        y: h2sList,
        type: 'scatter',
        name: "H<sub>2</sub>S",
        hovertemplate : 'H2S'
    };*/

    var data = [tod, tvoc, mos];

    const layout = {
        title : {
            text : '센서 데이터 라인 차트 그래프(ppb)',
            font: {
                size: 17,
                color: "#fff"
            }
        },
        xaxis : {
            visible : true,
            // dtick : 1,
            tickfont: {
                family: 'Arial',
                size: 10,
                color: '#fff'
            },
            color : "#fff",
            ticks : "outside",
            showgrid : true,
        },
        yaxis : {
            title : {
                text : 'ppb',
                font : {
                    size: 14,
                    color: '#fff'
                }
            },
            tickfont: {
                family: 'Arial',
                size: 12,
                color: '#fff'
            },
            color : "#fff",
            ticks : "outside",
            showgrid : true,
            rangemode: 'normal',
            fixedrange: true
        },
        legend: {
            font: {
                color: '#fff'
            }
        },
        plot_bgcolor: '#042238',
        paper_bgcolor: '#042238',
        autosize: false,
        width: $('#plotlyBarChart').width(),
        height: $('#plotlyBarChart').height(),
        margin: {
            t : 40,
            b : 40
        },
        showlegend : true,
    }
    const config = {
        responsive: true
    }
    Plotly.newPlot('plotlyBarChart', data, layout, config);
}
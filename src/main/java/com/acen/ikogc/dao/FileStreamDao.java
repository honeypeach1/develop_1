package com.acen.ikogc.dao;

import lombok.Setter;
import org.apache.ibatis.session.SqlSession;
import org.dom4j.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Stream;

/**
 * Created by KBJ on 2021-07-12
 * 텍스트 파일 DB History DAO
 */
@Repository
@Setter
public class FileStreamDao {

    @Autowired
    @Qualifier("sqlSession")
    private SqlSession sqlSession;

/*    public int setFileHistoryList(List<List<Object>> list) {
        System.out.println("list : " + list);
        ArrayList<Map<String, Object>> params = new ArrayList<>();
        Map<String, Object> param = null;

        //Insert되는 각 변수들 항목에 대한 설명
        *//*
        1. DataDateTime : 데이터 시간 값
        2. AbsoluteID : 장비명
        3. PeriodStyle : 장비 번호
        4. TOD : 복합 악취
        5. SS1(MOS) : MOS(복합악취 센서, Metal Oxide Semiconductor)
        6. TV1(VOC) : TVOC(총 휘발성 유기 화합물)
        7. OTT : 외부 온도
        8. OTH : 외부 습도
        9. OWD : 풍향
        10. OWS : 풍속
        11. ITT : 내부 온도
        12. BTV : 밧데리 전압
        *//*

        Iterator<List<Object>> iter = list.iterator();

        while (iter.hasNext()) {
            *//*
                ArrayList내 Map은 루프안에서 기본 HashMap으로 초기화해야함.
                루프 밖에서 선언과 함께 HashMap으로 초기화할 시
                마지막만 출력되는 이유 -> list에 add된 map이나 2번째 for문에서 put 되는 map이나 같은 주소값을 가진 객체라서

                for문 한번돌고 다시 put한다고 새로운 객체가 아님
                예) String a = "test"   // 주소값 00x01와 같을때
                          a = "change" // 주소값 00x04
                    다시 다른 값을 할당하면 00x01 주소의 값이 바뀌는 것이 아니라
                    내부적으로 new String() 으로 다시 만들어 지기때문에
                    반복문에서 다른값 할당하고 넣어도 문제가 없는것
                    +++ 만약 자주 변경이 있는 문자열은 StringBuffer를 사용함.
             *//*
            param = new HashMap<>();
            List<Object> doc = iter.next();
            if(doc.isEmpty()){

            }else{
                param.put("DataDateTime", doc.get(0));
                param.put("equipName", doc.get(1));
                param.put("PeriodStyle", doc.get(2));
                param.put("TOD", doc.get(3));
                param.put("SS1", doc.get(4));
                param.put("TV1", doc.get(5));
                param.put("OTT", doc.get(6));
                param.put("OTH", doc.get(7));
                param.put("OWD", doc.get(8));
                param.put("OWS", doc.get(9));
                param.put("ITT", doc.get(10));
                param.put("BTV", doc.get(11));
                params.add(param);
            }
        }

        System.out.println("params : " + params);
        Map<String,Object> insertMap = new HashMap<>();
        insertMap.put("list",params);

        return sqlSession.insert("FileStream.setFileStream",insertMap);
    }*/

    public void setFileHistoryList(List<List<Object>> list) {
        /*ArrayList<Map<String, Object>> params = new ArrayList<>();
        Map<String, Object> param = null;*/

        //2021-07-14
        //bjkim
        //다중 텍스트 파일 저장 성공

        //배포 pc에 적용시 디렉토리를 못찾음;
        //그래서 기본 /로 변경
        //String dir = "../webapps/ROOT/WEB-INF/classes/static/history/";
        
        //톰캣 폴더내부의 temp폴더
        String dir = "/";

        OutputStream out = null;
        try {
            File dirent = new File(dir);

            //저장할 디렉토리가 존재하지 않으면 생성
            if (!dirent.exists()) {
                dirent.mkdir();
            }

            File outFile = new File(System.getProperty("java.io.tmpdir"), "text.txt");

            //파일이 존재한다면 삭제한다.
            if (outFile.exists()) {
                outFile.delete();
            }

            //파일에 String값을 입력할 BufferedOutputStream 생성
            out = new BufferedOutputStream(new FileOutputStream(outFile));
            int periodStyle = 0;
            Iterator<List<Object>> iter = list.iterator();
            while (iter.hasNext()) {
                /*param = new HashMap<>();*/
                List<Object> doc = iter.next();

                if(doc.get(2).equals("1분 평균")){
                    periodStyle = 1;
                }else if(doc.get(2).equals("5분 평균")){
                    periodStyle = 2;
                }else if(doc.get(2).equals("10분 평균")){
                    periodStyle = 3;
                }else if(doc.get(2).equals("1시간 평균")){
                    periodStyle = 4;
                }else if(doc.get(2).equals("1일 평균")){
                    periodStyle = 5;
                }

                if (doc.get(0).equals("null")) {
                } else {
                    String message = doc.get(0) + "\t" + doc.get(1) + "\t" + periodStyle + "\t" + doc.get(3) + "\t" + doc.get(4) + "\t" + doc.get(5) + "\t" + doc.get(6)
                            + "\t" + doc.get(7) + "\t" + doc.get(8) + "\t" + doc.get(9) + "\t" + doc.get(10) + "\t" + doc.get(11) + "\t" + doc.get(12) + "\t" + doc.get(13)
                            + "\t" + doc.get(14) + "\n";
                    //저장한 string값을 Byte 배열로 변경

                    byte[] b = message.getBytes();
                    out.write(b);
                    out.flush();

                    /*param.put("DataDateTime", doc.get(0));
                    param.put("equipName", doc.get(1));
                    param.put("PeriodStyle", periodStyle);
                    param.put("TOD", doc.get(3));
                    param.put("SS1", doc.get(4));
                    param.put("TV1", doc.get(5));
                    param.put("TH1", doc.get(6));
                    param.put("TN1", doc.get(7));
                    param.put("OTT", doc.get(8));
                    param.put("OTH", doc.get(9));
                    param.put("OWD", doc.get(10));
                    param.put("OWS", doc.get(11));
                    param.put("ITT", doc.get(12));
                    param.put("BTV", doc.get(13));
                    param.put("VSD", doc.get(14));
                    params.add(param);*/
                }
            }

            out.close();

        } catch (IOException ioe) {
            //입출력에서 예외발생시 예외 내용 출력
            ioe.printStackTrace();
        }

        //만들어진 텍스트 파일을 불러와 데이터베이스에 저장
        try{
            sqlSession.insert("FileStream.setFileStream");
            System.out.println("성공");
        }catch (Exception e){
            System.out.println("DB 저장 실패 " + e);
            System.out.println("");
        }
    }
}

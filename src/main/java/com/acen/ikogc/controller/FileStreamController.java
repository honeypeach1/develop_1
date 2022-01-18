package com.acen.ikogc.controller;

import com.acen.ikogc.dao.FileStreamDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.*;
import java.util.logging.Logger;

import lombok.extern.log4j.Log4j;
/**
 * Created by KBJ 2021-07-05
 *
 * 텍스트 파일 입력 웹에 변환 프로그램 controller
 */

@Controller
@Log4j
public class FileStreamController {

    @Autowired
    FileStreamDao fileStreamDao;

    //2021-07-05
    // bjkim
    // 텍스트 파일 리스트 파라미터 가져오기
    @PostMapping("/getListData")
    @ResponseBody
    public boolean getTextFile(@RequestBody List<List<Object>> dataList) {

        /*
        1. 프론트엔드에서 다중 텍스트 파일을 불러서 리스트 형식으로 만든다.
        2. 만든 리스트 형식을 파라미터로 받는다.
           - 미리 파일을 서버단으로 업로드 저장하지 않는 이유는 벡엔드에서 데이터를 사용하기 쉽게 처리하여 받아오기 위함.
        3. 받은 파라미터를 웹 서버 내부 경로에 텍스트 파일을 생성한다.
        4. 생성한 텍스트 파일을 다중 insert(bulk insert)처리한다.
         */
        System.out.println("dataList.size() : " + dataList.size());
        try{
            fileStreamDao.setFileHistoryList(dataList);
           return true;
        }catch (Exception e){
            return false;
        }
    }
}

package com.acen.ikogc.service;

import org.apache.commons.collections.map.LinkedMap;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by shin on 2019-01-04.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class IndexServiceTest {

    @Autowired
    @Qualifier("sqlSession")
    private SqlSession sqlSession;

    public static void main(String[] args) {


        String[] aa = {"12","123","1235","567","88"};
        Arrays.sort(aa);

        for(String s :  aa) {
            System.out.println(s);
        }





//        for(String participantPeple : participantList) {
//            System.out.println(participantPeple);
//            for(String completionPeple : completionList) {
//                if(participantPeple.equals(completionPeple)) {
//
//                    System.out.println(index);
//                    participantList.remove(completionPeple);
//                }
//
//            }
//            index++;
//        }

//        System.out.println(participantList.get(0));

    }

    public Map<String,Object> test(String key) {




        return null;
    }

    public Map<String,Object> zeroMap(int count) {

        Map<String,Object> nullMap = new LinkedMap();
        for(int i =0; i<10; i++) {
            if(i>=count) {
                nullMap.put("data_" + i, "-");
            }
            else {
                nullMap.put("data_" + i, "0.0000");
            }
        }
        return nullMap;
    }

    public Map<String,Object> nullMap(int count) {

        Map<String, Object> nullMap = new LinkedMap();
        for (int i = 0; i< 10; i++) {
            if(i>=count) {
                nullMap.put("data_" + i, "-");
            }
            else {
                nullMap.put("data_" + i, "n/a");
            }
        }
        return nullMap;
    }

    @Test
    public void dasdasd() {
        Map<String, Object> map = new HashMap<>();
        map.put("beginReqDate", "2019-08-26");
        map.put("endReqDate", "2019-09-10 23:59:59");
        map.put("absoluteId", "NDGA_1");
        map.put("size", 70);
        map.put("offset", 70);
    }
}

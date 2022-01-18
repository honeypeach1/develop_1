package com.acen.ikogc.dao;

import com.acen.ikogc.domain.Member;
import lombok.Setter;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by shin on 2019-01-11.
 */
@Repository
@Setter
public class MemberDao {

    @Autowired
    @Qualifier("sqlSession")
    private SqlSession sqlSession;

    public int updatelock(Member member) {
        return sqlSession.update("member.updateLock",member);
    }


    public int updateMember(Member member) {
        return sqlSession.update("member.updateMember",member);
    }

    //삭제
    public int deleteMember(int memberNo) {
        return sqlSession.update("member.deleteMember",memberNo);
    }

    public int updatePassword(Member member) {
        return  sqlSession.update("member.updatePassword",member);
    }


    public Member getMember(String id) {

        Map<String, Object> findMap = new HashMap<>();
        findMap.put("id",id);
        return sqlSession.selectOne("member.getMember",findMap);
    }

    public Member getMemberNo(int id) {

        Map<String, Object> findMap = new HashMap<>();
        findMap.put("id",id);
        return sqlSession.selectOne("member.getMemberNo",findMap);
    }

    public int insertMember(Member member) {


        return sqlSession.insert("member.insertMember",member);
    }


    public int insertLoginLog(Member member) {
        return sqlSession.insert("member.insertLoinLog",member);
    }



    public Map<String,String> getRole(Member member) {
        return sqlSession.selectOne("member.getRole", member);
    }


    public List<Map<Integer,String>> getRoles() {
        return sqlSession.selectList("member.getRoles");
    }

}

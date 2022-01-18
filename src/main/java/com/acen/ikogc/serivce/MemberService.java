package com.acen.ikogc.serivce;

import com.acen.ikogc.dao.MemberDao;
import com.acen.ikogc.domain.Member;
import com.acen.ikogc.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackOn = Exception.class)
public class MemberService implements UserDetailsService {

	private static final String ROLE_PREFIX = "ROLE_";

	@Autowired
	private MemberDao memberDao;

	@Autowired
	private PasswordEncoder passwordEncoder;


	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		Member member = memberDao.getMember(id);
		return getUser(member);
	}

	public int insertMember(Member member) {
		member.setRegDate(new Date());
		member.setPassword(passwordEncoder.encode(member.getPassword()));
		return memberDao.insertMember(member);
	}


	private UserDetails getUser(Member member) {
		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + "USER"));

		Map<String,String> roleMap =  memberDao.getRole(member);
		grantedAuthorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + roleMap.get("roleName")));
		return new User(member.getMemberNo(), member.getId(), member.getPassword(), member.getName(), member.getRegDate(), grantedAuthorities);
	}

	//회원 수정
	public int update(Member member) {
		return memberDao.updateMember(member);
	}

	//회원 삭제
	public int delete(int memberNo) {
		return memberDao.deleteMember(memberNo);
	}

	private static final String INIT_PASSWORD = "123456789"; //초기화 시 비밀번호

	public int updatePassword(int memberNo) {
		Member member = memberDao.getMemberNo(memberNo);
		member.setPassword(passwordEncoder.encode(INIT_PASSWORD));
		return memberDao.updatePassword(member);
	}



	//회원계정 비활성화
	public int lock(int memberNo) {
		Member member = memberDao.getMemberNo(memberNo);
		member.setUseYn("N");
		return memberDao.updatelock(member);
	}

	//회원계정 활성화
	public int unlock(int memberNo) {
		Member member = memberDao.getMemberNo(memberNo);
		member.setUseYn("Y");
		return memberDao.updatelock(member);
	}

	public List<Map<Integer,String>> getRoles() {
		return memberDao.getRoles();
	}


}

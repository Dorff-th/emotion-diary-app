package com.zmylong.productivity.member.service;

import com.zmylong.productivity.member.entity.Member;
import com.zmylong.productivity.member.entity.Role;
import com.zmylong.productivity.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/*
핵심용도 : 회원가입, 회원 정보 수정, 탈퇴 등 Member 관련 "업무 기능" 처리
예시 메서드 : register(), updateProfile(), findById() 등
사용 위치 : 컨트롤러에서 주로 호출하여 DB에 저장하거나 응답용 DTO로 변환 등
 */
@Service
@RequiredArgsConstructor
@Log4j2
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member register(String username, String rawPassword) {
        String encodedPassword = passwordEncoder.encode(rawPassword);

        Member member = Member.builder()
                .username(username)
                .password(encodedPassword)
                .createdAt(LocalDateTime.now())
                .role(Role.USER)
                .build();

        return memberRepository.save(member);
    }
}

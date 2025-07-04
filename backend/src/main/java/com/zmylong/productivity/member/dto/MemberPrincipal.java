package com.zmylong.productivity.member.dto;

import com.zmylong.productivity.member.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class MemberPrincipal implements UserDetails {

    private final Member member;

    public MemberPrincipal(Member member) {
        this.member = member;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + member.getRole()));
    }

    @Override public String getUsername() { return member.getUsername(); }
    @Override public String getPassword() { return member.getPassword(); }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    public Long getId() {
        return member.getId();
    }

    public String getRole() {
        return member.getRole().toString();
    }
}


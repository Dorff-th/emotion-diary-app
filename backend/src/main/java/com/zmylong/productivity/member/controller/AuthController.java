package com.zmylong.productivity.member.controller;



import com.zmylong.productivity.legacyvue.common.dto.LoginRequest;
import com.zmylong.productivity.legacyvue.common.dto.LoginResponse;
import com.zmylong.productivity.legacyvue.common.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        // 인증 시도
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(), request.getPassword()
                )
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        // JWT 발급
        String token = jwtTokenProvider.createToken(userDetails.getUsername(),
                userDetails.getAuthorities().iterator().next().getAuthority());

        return new LoginResponse(token);
    }
}



package com.project.team.Util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;

/**
 * Spring Security 컨텍스트에서 현재 사용자의 'username'(이메일)을 가져옵니다.
 */
public class SecurityUtil {

    /**
     * SecurityContext에서 인증된 사용자의 이메일(username)을 반환합니다.
     */
    public static String getCurrentUserEmail() {
        // SecurityContext에서 Authentication 객체를 가져옵니다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || authentication.getName() == null) {
            throw new RuntimeException("인증된 사용자가 없습니다.");
        }

        // authentication.getName()은 UserDetailsServiceImpl에서 반환한
        // UserDetails의 getUsername() 값이며,
        // 현재 설정(JwtService, AuthenticationFilter)상 '이메일'입니다.
        return authentication.getName();
    }
}
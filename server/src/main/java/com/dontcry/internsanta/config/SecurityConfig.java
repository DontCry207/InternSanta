package com.dontcry.internsanta.config;

import com.dontcry.internsanta.api.service.MemberService;
import com.dontcry.internsanta.common.auth.JwtAuthenticationFilter;
import com.dontcry.internsanta.common.auth.MemberDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 인증(authentication) 와 인가(authorization) 처리를 위한 스프링 시큐리티 설정 정의.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private MemberDetailService memberDetailService;
    private final MemberService memberService;

    @Autowired
    public SecurityConfig(@Lazy MemberDetailService memberDetailService, @Lazy MemberService memberService) {
        this.memberDetailService = memberDetailService;
        this.memberService = memberService;
    }

    // Password 인코딩 방식에 BCrypt 암호화 방식 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // DAO 기반으로 Authentication Provider를 생성
    // BCrypt Password Encoder와 UserDetailService 구현체를 설정
//    @Bean
//    DaoAuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//        daoAuthenticationProvider.setUserDetailsService(this.memberDetailService);
//        return daoAuthenticationProvider;
//    }
//
//    // DAO 기반의 Authentication Provider가 적용되도록 설정
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) {
//        auth.authenticationProvider(authenticationProvider());
//    }
//
//    @Bean
//    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
//        http.authorizeExchange().anyExchange().permitAll();
//        return http.build();
//    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationManager(), memberService)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                .authorizeRequests()
//                .antMatchers(HttpMethod.GET, "/api/v1/member/info").authenticated()
//                .antMatchers(HttpMethod.PATCH, "/api/v1/member/*").authenticated()
//                .antMatchers(HttpMethod.GET, "/api/v1/recommend").authenticated()
//                .antMatchers(HttpMethod.GET, "/api/v1/song/info/*").authenticated()
//                .antMatchers(HttpMethod.GET, "/api/v1/song/like/*").authenticated()
//                .antMatchers(HttpMethod.POST, "/api/v1/song/*").authenticated()
//                .antMatchers(HttpMethod.DELETE, "/api/v1/song/*").authenticated()
//                .antMatchers(HttpMethod.POST, "/api/v1/shorts/*").authenticated()
//                .antMatchers(HttpMethod.DELETE, "/api/v1/shorts/*").authenticated()
//                .antMatchers(HttpMethod.GET, "/api/v1/shorts/*").authenticated()
//                .antMatchers(HttpMethod.POST, "/api/v1/magazine").authenticated()
//                .antMatchers(HttpMethod.DELETE, "/api/v1/magazine").authenticated()
                .anyRequest().permitAll()
                .and().cors();
    }
}
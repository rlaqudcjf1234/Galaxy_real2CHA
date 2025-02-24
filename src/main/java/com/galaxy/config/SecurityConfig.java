package com.galaxy.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.galaxy.security.FilterSkipMatcher;
import com.galaxy.security.JsonUsernamePasswordAuthenticationFilter;
import com.galaxy.security.JwtAuthenticationFilter;
import com.galaxy.security.JwtAuthenticationProvider;
import com.galaxy.security.LoginSuccessHandler;
import com.galaxy.security.RefreshTokenAuthenticationFilter;
import com.galaxy.security.RefreshTokenAuthenticationProvider;
import com.galaxy.service.JwtService;
import com.galaxy.service.impl.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity  
public class SecurityConfig {  

    @Autowired
    private JwtService jwtService;
  
    @Bean    
    public SecurityFilterChain httpFilterChain(HttpSecurity http) throws Exception {  
        http  
            .httpBasic(AbstractHttpConfigurer::disable)  
            .cors(cors ->  
                cors.configurationSource(corsConfigurationSource()))  
            .csrf(AbstractHttpConfigurer::disable)  
            .formLogin(AbstractHttpConfigurer::disable)  
            .sessionManagement(sessionManagement -> sessionManagement  
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))  
            .authorizeHttpRequests((authorizeRequests) -> authorizeRequests
                .requestMatchers("/user/**").permitAll()
                .anyRequest().authenticated()
            );  
  
        http.addFilterAfter(jsonUsernamePasswordAuthenticationFilter(), LogoutFilter.class);
        http.addFilterBefore(jwtAuthenticationFilter(), JsonUsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(refreshTokenAuthenticationFilter(), JwtAuthenticationFilter.class);
        return http.build();  
    }  

    @Bean  
    public CorsConfigurationSource corsConfigurationSource(){  
        CorsConfiguration corsConfig = new CorsConfiguration();  
  
        corsConfig.addAllowedOrigin("http://localhost:5173");  
        corsConfig.setAllowCredentials(true);  
        corsConfig.addAllowedHeader("*");  
        corsConfig.addAllowedMethod("*");  
        corsConfig.addExposedHeader("Authorization");  
        corsConfig.addExposedHeader("Set-Cookie");  
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();  
        source.registerCorsConfiguration("/**", corsConfig);  
        return source;  
    }

    @Bean  
    public PasswordEncoder passwordEncoder() {  
        DelegatingPasswordEncoder delegatingPasswordEncoder = (DelegatingPasswordEncoder) PasswordEncoderFactories.createDelegatingPasswordEncoder();  
        delegatingPasswordEncoder.setDefaultPasswordEncoderForMatches(new BCryptPasswordEncoder());  
        return delegatingPasswordEncoder;  
    }  
    
    @Bean  
    public UserDetailsService userDetailsService() {  
        return new UserDetailsServiceImpl();  
    }  
    
    @Bean  
    public AuthenticationManager authenticationManager() throws Exception {  
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();  
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());  
        daoAuthenticationProvider.setUserDetailsService(userDetailsService());
        
        JwtAuthenticationProvider jwtAuthenticationProvider = new JwtAuthenticationProvider(jwtService);
        jwtAuthenticationProvider.setUserDetailsService(userDetailsService());

        RefreshTokenAuthenticationProvider refreshTokenAuthenticationProvider = new RefreshTokenAuthenticationProvider(jwtService);
        refreshTokenAuthenticationProvider.setUserDetailsService(userDetailsService());

        return new ProviderManager(daoAuthenticationProvider, jwtAuthenticationProvider, refreshTokenAuthenticationProvider);  
    }  
    
    @Bean  
    public AuthenticationSuccessHandler loginSuccessHandler(){  
        return new LoginSuccessHandler(jwtService);  
    }

    @Bean
    public JsonUsernamePasswordAuthenticationFilter jsonUsernamePasswordAuthenticationFilter() throws Exception {  
        JsonUsernamePasswordAuthenticationFilter filter = new JsonUsernamePasswordAuthenticationFilter();  
    
        filter.setAuthenticationManager(authenticationManager());  
        filter.setAuthenticationSuccessHandler(loginSuccessHandler());  
    
        return filter;  
    }

    public JwtAuthenticationFilter jwtAuthenticationFilter() throws Exception{
        List<String> skipList = new ArrayList<>();
        skipList.add("/user/**");

        FilterSkipMatcher skipMatcher = new FilterSkipMatcher(skipList);

        JwtAuthenticationFilter filter = new JwtAuthenticationFilter(skipMatcher, jwtService);
        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }

    public RefreshTokenAuthenticationFilter refreshTokenAuthenticationFilter() throws Exception {
        RefreshTokenAuthenticationFilter filter = new RefreshTokenAuthenticationFilter(jwtService);
        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }
}

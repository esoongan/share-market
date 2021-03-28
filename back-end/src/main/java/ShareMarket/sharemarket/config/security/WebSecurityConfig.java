package ShareMarket.sharemarket.config.security;

import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor //생성자
//Spring Security를 사용하기위해 Spring Security Filter Chain을 사용한다는것을 명시해줘야함
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    // @RequiredArgsConstructor 로 인해 @Autowired 의존성 주입 됨
    private final JwtTokenProvider jwtTokenProvider;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // authenticationManager를 Bean에 등록한다.
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()// rest api만을 고려하여 기본설정을 해제한다.
                .csrf()
                    .ignoringAntMatchers("/h2-console/**")
                    .disable()//csrf보안토큰 해제처리
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰기반 인증이므로 세션을 사용하지 않는다.
                    .and()
                .authorizeRequests() //요청에 대한 사용권한 체크, 권한요청 처리 설정 메소드
                    .antMatchers("/admin/**").hasRole("ADMIN") //관리자는 관리자권한
                    .antMatchers("/user/**").hasRole("USER") //유저는 유저권한
                    .antMatchers("/**").permitAll()// 그외 나머지 요청은 누구나 접근 가능
                    .antMatchers("/h2-console/**").permitAll()
                    .and()
                // JwtAuthenticationFIlter를 UsernamePasswordAuthenticationFilter전에 넣는다.
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/h2-console/**");
    }


}

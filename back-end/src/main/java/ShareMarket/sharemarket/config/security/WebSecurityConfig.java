package ShareMarket.sharemarket.config.security;

import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity //Spring Security를 사용하기위해 Spring Security Filter Chain을 사용한다는것을 명시해줘야함
// WebSecurityConfigureAdapter를 상속받는 클래스를 통해 설정을 하고 별도의 로직작성 없이 로그인/로그아웃기능을 구현할수 있다.
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    // @RequiredArgsConstructor 로 인해 @Autowired 의존성 주입 됨
    private final JwtTokenProvider jwtTokenProvider;

    //SpringSecurity에서 제공하는 비밀번호 암호화객체 -> Service에서 비밀번호를 암호화 할 수 잇도록 Bean으로 등록
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

    // configure메소드를 오버라이딩해서 security설정을 잡아줌
    // HttpSecurity를 통해 HTTP요청에 대한 웹기반 보안을 구성함
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()// rest api만을 고려하여 기본설정을 해제한다.
                .csrf()
                    .ignoringAntMatchers("/h2-console/**")
                    .disable()//csrf보안토큰 해제처리
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰기반 인증이므로 세션을 사용하지 않는다.
                    .and()
                .authorizeRequests() //요청에 대한 사용권한 체크 (페이지권할설정)
                    .antMatchers("/admin/**").hasRole("ADMIN") //admin으로 시작하는 경로는 ADMIN롤을 가진 사용자만 접근가능
                    .antMatchers("/user/**").hasRole("USER") //user로 시작하는 경로는 USER롤을 가진 사용자만 접근가능
                    .antMatchers("/**").permitAll()// 그외 나머지 요청은 누구나 접근 가능
<<<<<<< HEAD
                    .antMatchers(HttpMethod.POST).permitAll()
=======
                    .antMatchers(HttpMethod.OPTIONS).permitAll()
>>>>>>> 1aeb0977cf13e8b8576c1107b220c34037ab7939
                    .antMatchers("/h2-console/**").permitAll()
                    .and()
                // JwtAuthenticationFIlter를 UsernamePasswordAuthenticationFilter전에 넣는다.
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
                        UsernamePasswordAuthenticationFilter.class);
    }
    // 함수인자에 있는 WebSecurity는 FilterChainProxy를 생성하는 필터임
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/h2-console/**");
    }
}

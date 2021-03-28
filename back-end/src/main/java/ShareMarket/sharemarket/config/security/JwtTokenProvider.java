package ShareMarket.sharemarket.config.security;


import ShareMarket.sharemarket.domain.users.MemberType;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

// 토큰을 생성하고 검증하는 컴포넌트
// 실제로 이 컴포넌트를 이용하는것은 인증작업을 진행하는 Filter클래스
// Filter는 검증이 끝난 JWT로부터 유저정보를 받아와서 UsernamePasswordAuthenticationFilter로 전달
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    //보호키
    private String secretKey = "sharemarket";

    //토큰 지속시간 30분
    private long TokenValidTime = 30 * 60 * 1000L;

    // Security UserDetailService
    private final UserDetailsService userDetailsService;

    //객체초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    //JWT토큰생성
    public String createToken(String userPk, List<MemberType> roles){
        Claims claims = Jwts.claims().setSubject(userPk); // JWTpayload에 저장되는 정보단위
        claims.put("roles", roles); // 정보는 키/값 쌍으로 저장됨
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims) //정보저장
                .setIssuedAt(now)  //토큰발행시간
                .setExpiration(new Date(now.getTime() + TokenValidTime)) // 토큰만료시간
                .signWith(SignatureAlgorithm.HS256, secretKey) // 사용할 암호화 알고리즘(hs256), signature에 들어갈 secret값 세팅
                .compact();
    }

    //JWT토큰에서 인증정보 조회
    public Authentication getAuthentication(String token){
        // 토큰에서 추출한 회원정보를 받아 우저를 로드하고 이를 userDetails에 담아 UsernamePasswordAuthenticationToken에 담아보낸다.
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    //토큰에서 회원정보 추출
    public String getUserPk(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    //Request의 Header에서 token의 값을 가져온다.
    // X-AUTH-TOKEN" : "TOKEN값"
    //jwt필터 클래스에서 사용
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    // 토큰 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}

package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.config.security.JwtTokenProvider;
import ShareMarket.sharemarket.domain.user.MemberType;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.domain.user.UserRepository;
import ShareMarket.sharemarket.dto.user.UserRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUserDetailService jwtUserDetailService;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    //id로 유저 조회
    public User detail(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("" + id));
    }

    // 회원가입로직담당
    public User register(UserRequestDto userRequestDto) {
        Boolean existed = userRepository.existsByUsername(userRequestDto.getUsername());

        // 이미 존재하는 유저아이디이면
        if (existed) {
            return null;
            //throw new IllegalArgumentException(userRequestDto.getUsername());
        }

        return userRepository.save(User.builder()
                .username(userRequestDto.getUsername())
                .password(passwordEncoder.encode(userRequestDto.getPassword()))
                .email(userRequestDto.getEmail())
                .addr(userRequestDto.getAddr())
                .roles(Collections.singletonList(MemberType.USER))
                .build());
    }

    // 로그인로직담당
    public String login(UserRequestDto userRequestDto) throws Exception {
        authenticate(userRequestDto.getUsername(), userRequestDto.getPassword());
        log.info("로그인성공");
        // 요청에 담긴 아이디값으로 디비에서 값을 찾아서 UserDetails로 반환하는 loadUserByUsername
        UserDetails userDetails = jwtUserDetailService.loadUserByUsername(userRequestDto.getUsername());
        return jwtTokenProvider.createToken(userDetails);
    }

    // 아이디 비밀번호 유효성검사
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            log.info("인증실패1");
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            log.info("인증실패2_아이디와 비밀번호 유효성x");
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (SecurityException e) {
            log.info("인증실패3");
            throw new Exception("SECRURITY", e);
        }

    }

    // 토큰으로부터 유저엔티티 조회
    public User getUserByToken(Object principal) {
        String userName = ((UserDetails) principal).getUsername();
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 없습니다."));
        log.info("토큰으로부터 사용자추출"+user.getId().toString());
        return user;
    }

    public String getUserNameByToken(Object principal) {
        return ((UserDetails) principal).getUsername();
    }}

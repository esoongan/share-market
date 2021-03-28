package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.config.security.JwtTokenProvider;
import ShareMarket.sharemarket.domain.users.MemberType;
import ShareMarket.sharemarket.domain.users.User;
import ShareMarket.sharemarket.domain.users.UserRepository;
import ShareMarket.sharemarket.dto.UserRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    public User detail(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("" + id));
    }

    // 회원가입로직담당
    public User register(UserRequestDto userRequestDto) {
        Boolean existed = userRepository.existsByUsername(userRequestDto.getUsername());

        if (existed) {
            throw new IllegalArgumentException(userRequestDto.getUsername());
        }

        return userRepository.save(User.builder()
                    .username(userRequestDto.getUsername())
                    .password(userRequestDto.getPassword())
                    .email(userRequestDto.getEmail())
                    .location(userRequestDto.getLocation())
                    .roles(Collections.singletonList(MemberType.USER))
                .build());
    }

    // 로그인로직담당
    public String login(UserRequestDto userRequestDto) {
        // 요청에 담긴 아이디값으로 디비에서 값을 찾은후 user에 담는다.
        User user = userRepository.findByUsername(userRequestDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException(userRequestDto.getUsername()));
        // 해당 유저에 대한 토큰을 생성해서 반환함.
        return jwtTokenProvider.createToken(user.getUsername(), user.getRoles());
    }



}

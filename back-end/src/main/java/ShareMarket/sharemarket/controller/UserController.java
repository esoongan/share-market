package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.users.MemberType;
import ShareMarket.sharemarket.domain.users.User;
import ShareMarket.sharemarket.dto.UserRequestDto;
import ShareMarket.sharemarket.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@Slf4j //로그찍는 라이브러리
@RequiredArgsConstructor
@RestController // API서버로서 동작할것이므로 RestController를 이용한다.
public class UserController {

    private final UserService userService;

    //회원가입
    @CrossOrigin("*")
    @PostMapping("/join")
    public ResponseEntity<User> join(@RequestBody UserRequestDto userRequestDto) throws URISyntaxException {

        log.info("resource -> {}", userRequestDto);
        User user = userService.register(userRequestDto); // 회원등록
        log.info("user -> {}", user);
        URI url = new URI(String.format("/users/%s", user.getId()));
        return ResponseEntity.created(url).body(user);
    }

    //로그인
    @CrossOrigin("*")
    @PostMapping("/login")
    public String login(@RequestBody UserRequestDto userRequestDto) {
        return userService.login(userRequestDto);
    }


    //현재 요청헤더에 담긴 사용자 정보조회
    @GetMapping("/current")
    @ResponseBody
    public UserDetails currentUserName(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails;
    }

    //유저_id(기본키값)에 따른 유저정보 조회
    @GetMapping("/users/{id}")
    public User details(@PathVariable Long id) {
        return userService.detail(id);
    }
}

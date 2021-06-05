package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.user.UserRequestDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@Slf4j //로그찍는 라이브러리
@RequiredArgsConstructor
@RestController // API서버로서 동작할것이므로 RestController를 이용한다.
@CrossOrigin
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/api/user/join")
    public ResponseEntity<User> join(@RequestBody UserRequestDto userRequestDto) throws URISyntaxException {

        log.info("resource -> {}", userRequestDto);
        User user = userService.register(userRequestDto); // 회원등록
        log.info("user -> {}", user);
        log.info("회원가입 성공");
        URI url = new URI(String.format("/users/%s", user.getId()));
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.CREATED,
                HttpResponseMessage.CREATED_USER,
                user), HttpStatus.CREATED);
    }

    //로그인
    @PostMapping("/api/user/login")
    public ResponseEntity<?> login(@RequestBody UserRequestDto userRequestDto) throws Exception {
        String token =  userService.login(userRequestDto);
        return ResponseEntity.ok(token);
    }

    //현재 요청 토큰에 담긴 사용자 정보조회
    @GetMapping("/uauth/api/user/login")
    @ResponseBody
    public UserDetails currentUserName(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails;
    }

    //유저_id(기본키값)에 따른 유저정보 조회
    @GetMapping("/api/user/{id}")
    public User details(@PathVariable Long id) {
        return userService.detail(id);
    }
}

package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.users.MemberType;
import ShareMarket.sharemarket.domain.users.User;
import ShareMarket.sharemarket.dto.UserRequestDto;
import ShareMarket.sharemarket.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collections;
import java.util.Map;

@Slf4j //로그찍는 라이브러리
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    //회원가입
    @PostMapping("/join")
    public ResponseEntity<User> join(@RequestBody UserRequestDto userRequestDto) throws URISyntaxException {

        log.info("resource -> {}", userRequestDto);
        User user = userService.register(userRequestDto);
        log.info("user -> {}", user);
        URI url = new URI(String.format("/users/%s", user.getId()));
        return ResponseEntity.created(url).body(user);
    }

    //로그인
    @PostMapping("/login")
    public String login(@RequestBody UserRequestDto userRequestDto) {
        return userService.login(userRequestDto);
    }

    //조회
    @GetMapping("/users/{id}")
    public User details(@PathVariable Long id) {
        return userService.detail(id);
    }
}

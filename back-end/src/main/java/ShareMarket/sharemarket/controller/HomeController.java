package ShareMarket.sharemarket.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //컨트롤러를 JSON을 반환하는 컨트롤러로 만들어
public class HomeController {

    @GetMapping("/")
    public String home(){
        return "home";
    }

}
// RequestParam() -> 외부에서 API로 넘긴 파라미터를 가져오는 어노테이션
// 외부에서 name이라는 이름으로 넘긴 파라미터를 메소드 파라미터 name에 저장함!

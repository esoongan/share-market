package ShareMarket.sharemarket.web.Controller;


//회원가입을 위한 컨트롤러

import ShareMarket.sharemarket.domain.users.Account;
import ShareMarket.sharemarket.domain.users.AccountRepository;
import ShareMarket.sharemarket.util.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class UserRegisterController {

    @Autowired
    AccountRepository accountRepository; //리포지토리 객체를 의존성 주입을 통해 받는다(?)

    @CrossOrigin(origins = "*", allowedHeaders = "*") // 모든 아이피에 대해서 받겠다.
    @PostMapping("/user")
    @ResponseBody
    public String registerUser(@RequestBody Account newAccount) {

        String username = newAccount.getUsername();
        String password = Hashing.hashingPassword(newAccount.getPassword()); // 해싱해줘야됨
        String email = newAccount.getEmail();
        String location = newAccount.getLocation();

        if (username.equals("") || password.equals("") || email.equals(""))
            return "회원가입에 실패하였습니다.";

        // 유효한 정보라면 account객체 새로 생성해서 저장해줌
        Account account = new Account();
        account.setUsername(username);
        account.setPassword(password);
        account.setEmail(email);
        account.setLocation(location);

        // 기존에 있는 아이디라면
        if (accountRepository.findByUsername(username) != null)
            return "회원가입에 실패하였습니다.";

        // JPA에 의해 자동으로 save함수가 제공됨
        accountRepository.save(account);

        return "회원가입에 성공하였습니다.";

    }
}








package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.mail.MailDto;
import ShareMarket.sharemarket.service.MailService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;

    @PostMapping("/mail")
    public void sendMail(MailDto mailDto) {
        mailService.sendMail(mailDto);
    }
}

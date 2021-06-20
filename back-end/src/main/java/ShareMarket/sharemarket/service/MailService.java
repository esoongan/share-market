package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.dto.mail.MailDto;
import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class MailService {

    // JavaMailSender : MailSender인터페이스를 상속받았으며 MIME을 지원함
    // JavaMailSender를 구현한 구현체인 JavaMailSenderImpl 빈이 DI됨
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "sharemarketkorea@gmail.com";
    private static final String TITLE = "[SHARE-MARKET] 새로운 거래요청이 들어왔습니다!";

    @Transactional
    public void sendMail(MailDto mailDto) {
        // 스프링제공클래스 - 이메일메시지정보작성
        SimpleMailMessage message = new SimpleMailMessage();
        // 받는사람주소
        message.setTo(mailDto.getAddress());
        // 보내는사람주소 ( 해당메서드를 호출하지 않으면 application.properties에 작성한 username으로 셋팅됨)
        message.setFrom(MailService.FROM_ADDRESS);
        //제목은 고정
        message.setSubject(MailService.TITLE);
        // 메시지내용
        message.setText(mailDto.getMessage());

        // 실제 메일발송
        mailSender.send(message);

    }
}

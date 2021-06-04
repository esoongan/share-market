package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.chat.ChatRequestDto;
import ShareMarket.sharemarket.dto.chat.ChatResponseDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@AllArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/uauth/api/chat")
    public ResponseEntity<ChatResponseDto> saveChat(@RequestBody ChatRequestDto requestDto, Authentication authentication) {

        ChatResponseDto responseDto = chatService.saveChat(requestDto, authentication);

        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.CREATED,
                HttpResponseMessage.CREAT_CHAT,
                responseDto), HttpStatus.CREATED);
    }



}

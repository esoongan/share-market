package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomResponseDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/uauth/api/chatroom")
    // 데이터가 하나만있는 body를 받기위해 DTO를 만드는게 비효율적이라고 생각해서 Map으로 간단히 받음
    public ResponseEntity<ChatRoomResponseDto> makeRoom(@RequestBody Map<String, Long> param, Authentication authentication) {
        Long id = param.get("postId");
        ChatRoomResponseDto responseDto = chatRoomService.makeRoom(id, authentication);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.CREATE_ROOM,
                responseDto), HttpStatus.OK);
    }
}

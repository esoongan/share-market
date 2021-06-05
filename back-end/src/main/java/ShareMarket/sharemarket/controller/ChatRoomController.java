package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.chatRoom.ChatRoomRequestDto;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomResponseDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RestController
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

//    @PostMapping("/uauth/api/chatroom")
//    // 데이터가 하나만있는 body를 받기위해 DTO를 만드는게 비효율적이라고 생각해서 Map으로 간단히 받음
//    public ResponseEntity<ChatRoomResponseDto> makeRoom(@RequestBody Map<String, Long> param, Authentication authentication) {
//        Long id = param.get("postId");
//        ChatRoomResponseDto responseDto = chatRoomService.makeRoom(id, authentication);
//        return new ResponseEntity(DefaultRes.response(
//                HttpStatusCode.OK,
//                HttpResponseMessage.CREATE_ROOM,
//                responseDto), HttpStatus.OK);
//    }

    @PostMapping("/uauth/api/chatroom")
    public ResponseEntity<ChatRoomResponseDto> makeRoom(@RequestBody ChatRoomRequestDto requestDto) {
        ChatRoomResponseDto responseDto = chatRoomService.makeRoom(requestDto);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.CREATE_ROOM,
                responseDto), HttpStatus.OK);
    }


    // 내가 참여하고있는 채팅방목록
    @GetMapping("/uauth/api/chatroom")
    public ResponseEntity<Page<ChatRoomResponseDto>> getRoom(@RequestParam String ver,
                                                             Authentication authentication,
                                                             @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ChatRoomResponseDto> roomResponseDtos = chatRoomService.getRoom(ver, authentication, pageable);

        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.READ_ROOM,
                roomResponseDtos), HttpStatus.OK);
    }
}

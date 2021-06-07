package ShareMarket.sharemarket.exception;

import ShareMarket.sharemarket.dto.chatRoom.ChatRoomResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatRoomExistException extends RuntimeException {
    private ChatRoomResponseDto roomResponseDto;
}

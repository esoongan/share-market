package ShareMarket.sharemarket.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatRoomExistException extends RuntimeException {
    private Long id;
}

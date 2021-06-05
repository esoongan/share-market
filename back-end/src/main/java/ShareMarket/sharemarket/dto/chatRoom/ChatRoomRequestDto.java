package ShareMarket.sharemarket.dto.chatRoom;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ChatRoomRequestDto {

    private Long postId;
    private String seller;
    private String buyer;

}

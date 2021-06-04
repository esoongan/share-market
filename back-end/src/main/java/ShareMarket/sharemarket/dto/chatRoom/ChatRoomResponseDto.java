package ShareMarket.sharemarket.dto.chatRoom;

import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@NoArgsConstructor
public class ChatRoomResponseDto {

    private Long id;
    private String seller;
    private String buyer;
    private Long postId;
    private String lastMessage;

    public ChatRoomResponseDto(ChatRoom room, String lastMessage) {
        this.id = room.getId();
        this.seller = room.getSeller().getUsername();
        this.buyer = room.getBuyer().getUsername();
        this.postId = room.getPost().getId();
        this.lastMessage = lastMessage;
    }






}

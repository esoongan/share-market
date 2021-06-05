package ShareMarket.sharemarket.dto.chat;

import ShareMarket.sharemarket.domain.chat.Chat;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class ChatDto {

    private ChatRoom room;
    private User sender;
    private String message;

    @Builder
    public ChatDto(ChatRoom room, User sender, String message) {
        this.room = room;
        this.sender = sender;
        this.message = message;
    }

    public Chat toEntity() {
        return Chat.builder()
                .room(this.room)
                .user(this.sender)
                .message(this.message)
                .build();

    }









}

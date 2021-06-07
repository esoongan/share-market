package ShareMarket.sharemarket.dto.chat;

import ShareMarket.sharemarket.domain.chat.Chat;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter // No serializer foung for class
public class ChatResponseDto {

    private Long id;
    // No serializer found for class org.hibernate.proxy.pojo.bytebuddy.ByteBuddyInterceptor and no properties오류
    // 해당 Object를 JSON타입으로 변환하기 위해서는 Lazy설정을 지우던가
    // 해당 Object를 JSON으로 변환하지 않는다면 @JsonIgnore어노테이션을 붙인다.
//    private ChatRoom room;
//    private User user;
    private Long roomId;
    private String username;
    private String message;
    private LocalDateTime createdDate;


    public ChatResponseDto(Chat chat) {
        this.id = chat.getId();
        this.roomId = chat.getRoom().getId();
        this.username = chat.getUser().getUsername();
        this.message = chat.getMessage();
        this.createdDate = chat.getCreatedDate();
    }
}

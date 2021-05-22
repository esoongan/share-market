package ShareMarket.sharemarket.dto.chatRoom;

import ShareMarket.sharemarket.domain.chat.Chat;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ChatRoomDto {
    private Post post;
    private User user1;
    private User user2;

    @Builder // 생성자
    public ChatRoomDto(Post post, User user1, User user2) {
        this.post = post;
        this.user1 = user1;
        this.user2 = user2;
    }


    public ChatRoom toEntity() {
        return ChatRoom.builder() // 내부 빌더클래스 생성자
                .post(post) // 값 세팅
                .user1(user1)
                .user2(user2)
                .build(); // 빌더메서드로 ChatRoom객체생성
    }



}

package ShareMarket.sharemarket.dto.chatRoom;

import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter //No HttpMessageConverter for ShareMarket.sharemarket.dto.chatRoom.ChatRoomDto
@NoArgsConstructor
public class ChatRoomDto {
    private Post post;
    private User seller;
    private User buyer;

    @Builder // 생성자 (setter대신 생성자로 값넣음)
    public ChatRoomDto(Post post, User seller, User buyer) {
        this.post = post;
        this.seller = seller;
        this.buyer = buyer;
    }

    public ChatRoom toEntity() {
        return ChatRoom.builder() // 내부 빌더클래스 생성자
                .post(post) // 값 세팅
                .seller(seller)
                .buyer(buyer)
                .build(); // 빌더메서드로 ChatRoom객체생성
    }
}

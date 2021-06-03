package ShareMarket.sharemarket.domain.chat;

import ShareMarket.sharemarket.domain.BaseTimeEntity;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Chat extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 하나의 룸당 여러개 채팅메시지
    @ManyToOne(targetEntity = ChatRoom.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    private ChatRoom room;

    // 한명의 유저당 여러개의 채팅메시지
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    private User user; // 보낸사람

    private String message;


    @Builder
    public Chat(ChatRoom room, User user, String message) {
        this.room = room;
        this.user = user;
        this.message = message;
    }


}

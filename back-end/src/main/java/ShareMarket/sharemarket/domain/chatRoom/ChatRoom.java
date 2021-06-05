package ShareMarket.sharemarket.domain.chatRoom;

import ShareMarket.sharemarket.domain.BaseTimeEntity;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class ChatRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // roomId

    // 한명의 유저당 여러개의 채팅룸 가능
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    @JoinColumn(name = "seller")
    private User seller; // 먼저 보낸사람

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    @JoinColumn(name="buyer")
    private User buyer; // 판매자

    // 하나의 게시글당 여러개의 채팅룸 가능
    @ManyToOne(targetEntity = Post.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    @JoinColumn(name="postId")
    private Post post;


    @Builder // 객체생성(빌더클래스이용한 생성자)
    public ChatRoom(Long id, User seller, User buyer, Post post) {
        this.id = id;
        this.seller = seller;
        this.buyer = buyer;
        this.post = post;
    }
}

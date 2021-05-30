package ShareMarket.sharemarket.domain.chatRoom;

import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // roomId

    // 한명의 유저당 여러개의 채팅룸 가능
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    @JoinColumn(name = "user1Id")
    private User user1; // 먼저 보낸사람

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    @JoinColumn(name="user2Id")
    private User user2; // 판매자

    // 하나의 게시글당 여러개의 채팅룸 가능
    @ManyToOne(targetEntity = Post.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    @JoinColumn(name="postId")
    private Post post;


    @Builder // 객체생성(빌더클래스이용한 생성자)
    public ChatRoom(Long id, User user1, User user2, Post post) {
        this.id = id;
        this.user1 = user1;
        this.user2 = user2;
        this.post = post;
    }
}

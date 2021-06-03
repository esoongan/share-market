package ShareMarket.sharemarket.domain.chatRoom;

import ShareMarket.sharemarket.domain.chat.Chat;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByPostAndUser1AndUser2(Post post, User user1, User user2);

    //내가 user1인경우 - 구매자
    Page<ChatRoom> findAllByUser1(User user1, Pageable pageable);

    //내가 user2인경우 - 판매자
    Page<ChatRoom> findAllByUser2(User user2, Pageable pageable);


}

package ShareMarket.sharemarket.domain.chatRoom;

import ShareMarket.sharemarket.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    Optional<ChatRoom> findByUser1AndUser2(User user1, User user2);

}

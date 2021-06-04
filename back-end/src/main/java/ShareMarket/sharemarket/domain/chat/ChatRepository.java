package ShareMarket.sharemarket.domain.chat;

import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    // 현재시각을 인자로 줘서 가장 가까운 시간을 가지면서 roomId와 같은 첫번째(하나의) 채팅을 반환
//    Optional<Chat> findFirstByRoomAndCreatedDateIsNear(ChatRoom room, LocalDateTime createdDate);

    // createdDate로 sort해서 첫번째 chat만 가져온다.
    Optional<Chat> findTopByRoom(ChatRoom room, Sort sort);

    Optional<Chat> findOneByRoom(ChatRoom room);

    Page<Chat> findAllByRoom(ChatRoom room, Pageable pageable);

}

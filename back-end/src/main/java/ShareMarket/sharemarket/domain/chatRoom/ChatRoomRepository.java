package ShareMarket.sharemarket.domain.chatRoom;

import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {


    Optional<ChatRoom> findByPostAndBuyerAndSeller(Post post, User buyer, User seller);

    //내가 user1인경우 - 구매자
    Page<ChatRoom> findAllByBuyer(User buyer, Pageable pageable);

    //내가 user2인경우 - 판매자
    Page<ChatRoom> findAllBySeller(User seller, Pageable pageable);


}

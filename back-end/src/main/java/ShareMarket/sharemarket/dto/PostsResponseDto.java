package ShareMarket.sharemarket.dto;

import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.users.User;
import ShareMarket.sharemarket.domain.users.UserRepository;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Getter
@Data
// 디비로부터 불러와서 정보를 반환하는 객체 -> 반환에는 엔티티객체(Post)가 아니고 Dto객체를 반환한다.
public class PostsResponseDto {

    private Long id;
    private String user_id;
    private String title;
    private String content;
    private String category;
    private String addr; // Post응답Dto에만 있으면 됨 ( request에는 없어도되고 디비에 중복으로 저장할필요도 없음)
    private String price;
    private String deposit;

    public PostsResponseDto(Post entity, String addr) {
        this.id = entity.getId();
        this.user_id = entity.getUser_id();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.category = entity.getCategory();
        this.addr = addr;
        this.price = entity.getPrice();
        this.deposit = entity.getDeposit();
    }
}

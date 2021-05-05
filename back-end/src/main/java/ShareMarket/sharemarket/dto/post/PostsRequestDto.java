package ShareMarket.sharemarket.dto.post;

import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.users.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// 엔티티를 보호하기 위해 한번더 감싸는 dto인데, 그중에서도 클라이언트로부터 받은 데이터를 담아 요청처리를 담당하는 dto
public class PostsRequestDto {

//    // 현재 요청한 유저가 누구인지 함께 저장하기위해 토큰에서 사용자 정보 추출하기 위함 --> UserService에서 getUserNameByToken을 이용하는것으로 변경함
//    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//    UserDetails userDetails = (UserDetails) principal;

    private String title;
    private String content;
    private String user_id;
    private String category;
    private String price;
    private String deposit;

    // 디비에 저장하기 위해 요청DTO를 엔티티로 변환하기위함
    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .user_id(user_id) // 토큰으로 아이디 조회후 디비에 저장
                .category(category)
                .price(price)
                .deposit(deposit)
                .build();
    }

}

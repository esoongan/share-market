package ShareMarket.sharemarket.dto;

import ShareMarket.sharemarket.domain.posts.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@NoArgsConstructor
@AllArgsConstructor
// 엔티티를 보호하기 위해 한번더 감싸는 dto인데, 그중에서도 클라이언트로부터 받은 데이터를 담아 요청처리를 담당하는 dto
public class PostsRequestDto {

    // 현재 요청한 유저가 누구인지 함께 저장하기위해 토큰에서 사용자 정보 추출하기 위함
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UserDetails userDetails = (UserDetails)principal;

    private Long id;
    private String title;
    private String content;
    private String user_id;
    private String category;
    private String price;
    private String deposit;

// 생성지 - @All~ 로 대체함 (이해를 돕기위해 지우지않음)
//    @Builder
//    public PostsRequestDto(String title, String content, String user_id, String category, String price, String deposit, String photo){
//        this.title = title;
//        this.content = content;
//        this.user_id = user_id;
//        this.category = category;
//        this.price = price;
//        this.deposit = deposit;
//        this.photo = photo;
//    }

    public Post toEntity() {
        return Post.builder()
                .user_id(((UserDetails) principal).getUsername())
                .title(title)
                .content(content)
                .category(category)
                .price(price)
                .deposit(deposit)
                .build();
    }

}

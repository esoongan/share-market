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
// 클라이언트로부터 정보를 받아서 디비에 저장하는 객체
public class PostsRequestDto {

    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UserDetails userDetails = (UserDetails)principal;

    private Long id;
    private String title;
    private String content;
    private String user_id;
    private String category;
    private String price;
    private String deposit;
    private String photo;

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
                .photo(photo)
                .category(category)
                .price(price)
                .deposit(deposit)
                .build();
    }

}

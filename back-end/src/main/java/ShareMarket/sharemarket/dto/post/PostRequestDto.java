package ShareMarket.sharemarket.dto.post;

import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
// 엔티티를 보호하기 위해 한번더 감싸는 dto인데, 그중에서도 클라이언트로부터 받은 데이터를 담아 요청처리를 담당하는 dto
public class PostRequestDto {

    private String title;
    private String content;
    private User user;
    private String category;
    private Integer price;
    private Integer deposit;

    // 디비에 저장하기 위해 요청DTO를 엔티티로 변환하기위함
    public Post toEntity() {
        return Post.builder()
                .title(title)
                .content(content)
                .user(user)
                .category(category)
                .price(price)
                .deposit(deposit)
                .build();
    }

}

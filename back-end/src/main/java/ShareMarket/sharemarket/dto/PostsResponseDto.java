package ShareMarket.sharemarket.dto;

import ShareMarket.sharemarket.domain.posts.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
// 디비로부터 불러와서 정보를 반환하는 객체 -> 반환에는 엔티티객체(Post)가 아니고 Dto객체를 반환한다.
public class PostsResponseDto {

    private Long id;
    private String user_id;
    private String title;
    private String content;
    private String category;
    private String price;
    private String deposit;

    public PostsResponseDto(Post entity) {
        this.id = entity.getId();
        this.user_id = entity.getUser_id();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.category = entity.getCategory();
        this.price = entity.getPrice();
        this.deposit = entity.getDeposit();
    }
}

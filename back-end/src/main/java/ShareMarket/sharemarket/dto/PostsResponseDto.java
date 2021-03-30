package ShareMarket.sharemarket.dto;

import ShareMarket.sharemarket.domain.posts.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostsResponseDto {

    private Long id;
    private String user_id;
    private String title;
    private String content;
    private String category;
    private String photo;
    private String price;
    private String deposit;

    public PostsResponseDto(Post entity) {
        this.id = entity.getId();
        this.user_id = entity.getUser_id();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.category = entity.getCategory();
        this.photo = entity.getPhoto();
        this.price = entity.getPrice();
        this.deposit = entity.getDeposit();
    }
}

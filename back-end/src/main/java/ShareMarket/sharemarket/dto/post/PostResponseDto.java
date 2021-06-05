package ShareMarket.sharemarket.dto.post;

import ShareMarket.sharemarket.domain.post.Post;
import lombok.Data;
import lombok.Getter;


@Getter
@Data
// 디비로부터 불러와서 정보를 반환하는 객체 -> 반환에는 엔티티객체(Post)가 아니고 Dto객체를 반환한다.
public class PostResponseDto {

    private Long id;
    private String username;
    private String title;
    private String content;
    private String category;
    private String addr; // Post응답Dto에만 있으면 됨 ( request에는 없어도되고 디비에 중복으로 저장할필요도 없음)
    private Integer price;
    private Integer deposit;

    public PostResponseDto(Post entity) {
        this.id = entity.getId();
        this.username = entity.getUser().getUsername();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.category = entity.getCategory();
        this.addr = entity.getUser().getAddr();
        this.price = entity.getPrice();
        this.deposit = entity.getDeposit();
    }
}

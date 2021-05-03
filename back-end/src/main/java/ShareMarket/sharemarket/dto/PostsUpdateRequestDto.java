package ShareMarket.sharemarket.dto;

import ShareMarket.sharemarket.domain.posts.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Builder // 전체 필드를 모두 사용해서 생성자를 만들경우 굳이 생성자에 @Builder말고 클래스바로위에 해도됨
@NoArgsConstructor
public class PostsUpdateRequestDto {
    private String title;
    private String content;
    private String category;
    private String price;
    private String deposit;

    @Builder
    public PostsUpdateRequestDto(String title, String content, String category, String price, String deposit) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.price = price;
        this.deposit = deposit;
    }

}
package ShareMarket.sharemarket.dto.post;

import ShareMarket.sharemarket.domain.posts.Post;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostsListResponseDto {
    private final Long id;
    private final String title;
    private final String user_id;
    private final LocalDateTime modifiedDate;

    public PostsListResponseDto(Post entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.user_id = entity.getUser_id();
        this.modifiedDate = entity.getModifiedDate();
    }
}
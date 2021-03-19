package ShareMarket.sharemarket.web.dto;

import ShareMarket.sharemarket.domain.posts.Posts;
import lombok.Getter;

@Getter
public class PostsResponseDto {

    private final Long id;
    private final String title;
    private final String content;
    private final String author;

    public PostsResponseDto(Posts entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.author = entity.getAuthor();
    }
}

package ShareMarket.sharemarket.dto;

import ShareMarket.sharemarket.domain.posts.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
    private String title;
    private String content;
    private String author;
    private String category;
    private String price;
    private String deposit;
    private String photo;

    @Builder
    public PostsSaveRequestDto(String title, String content, String author, String category, String price, String deposit, String photo){
        this.title = title;
        this.content = content;
        this.author = author;
        this.category = category;
        this.price = price;
        this.deposit = deposit;
        this.photo = photo;
    }

    public Post toEntity(){
        return Post.builder()
                .title(title)
                .content(content)
                .author(author)
                .category(category)
                .price(price)
                .deposit(deposit)
                .photo(photo)
                .build();

    }
}

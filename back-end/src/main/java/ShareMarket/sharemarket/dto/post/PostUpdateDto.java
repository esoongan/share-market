package ShareMarket.sharemarket.dto.post;

import ShareMarket.sharemarket.domain.user.User;

public class PostUpdateDto {

    private String title;
    private String content;
    private String category;
    private Integer price;
    private Integer deposit;

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getCategory() {
        return category;
    }

    public Integer getPrice() {
        return price;
    }

    public Integer getDeposit() {
        return deposit;
    }
}

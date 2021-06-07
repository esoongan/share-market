package ShareMarket.sharemarket.dto.post;

public class PostUpdateDto {

    // 바뀌는 정보만 필드로 갖기때문에 response랑 다름
    // post update에서 인자로 전달 -> 전달받은 필드들만 업데이트
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

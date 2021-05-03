package ShareMarket.sharemarket.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiErrorResponse {
    // 일반적으로 알파벳, 숫자, 언더바를 포함함 , 고유의 코드를 내려줌
    private String title; // 응답코드와 같으면 안됨, 사람이 보고 이해할수있는 에러코드
    private String message;
    private String detail;

    public ApiErrorResponse(String title, String message) {
        super();
        this.title = title;
        this.message = message;
    }

    public ApiErrorResponse(String title, String message, String detail) {
        super();
        this.title = title;
        this.message = message;
        this.detail = detail;
    }

}

package ShareMarket.sharemarket.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ApiResponseMessage {

    private String status;
    private String message;
    private String errorMessage;
    private String errorCode;

    public ApiResponseMessage() {

    }

    public ApiResponseMessage(String status, String message, String errorMessage, String errorCode) {
        this.status = status;
        this.message = message;
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
    }
}

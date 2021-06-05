package ShareMarket.sharemarket.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
// 상태코드, 응답메세지, 데이터 형식을 갖춰서 클라리언트에 응답해주기 위한 클래스
public class DefaultRes<T> {

    private int statusCode;
    private String httpResponseMessage;
    private T data;


    public DefaultRes(final int statusCode, final String httpResponseMessage) {
        this.statusCode = statusCode;
        this.httpResponseMessage = httpResponseMessage;
        this.data = null;
    }

    public static<T> DefaultRes<T> response(final int stautsCode, final String httpResponseMessage) {
        return response(stautsCode, httpResponseMessage, null);
    }

    public static<T> DefaultRes<T> response(final int stautsCode, final String httpResponseMessage, final T t) {
        return DefaultRes.<T>builder()
                .data(t)
                .statusCode(stautsCode)
                .httpResponseMessage(httpResponseMessage)
                .build();
    }
}

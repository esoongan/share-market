package ShareMarket.sharemarket.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DefaultException extends RuntimeException {
    private String message;

}

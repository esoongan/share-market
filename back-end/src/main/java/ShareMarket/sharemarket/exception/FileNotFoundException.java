package ShareMarket.sharemarket.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FileNotFoundException extends RuntimeException {
    private Long id;
}

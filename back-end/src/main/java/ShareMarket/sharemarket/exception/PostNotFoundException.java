package ShareMarket.sharemarket.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostNotFoundException extends RuntimeException {
    private long id;
}

package ShareMarket.sharemarket.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor // 초기화되지 않은 final필드나, @NonNull이 붙은 필드에 대해 생성자를 생성함
public class HomeResponseDto {

    private final String name;
    private final int amount;

}

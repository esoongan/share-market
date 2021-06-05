package ShareMarket.sharemarket.dto.chat;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 컨트롤러에서 @RequestBody를 통해 매핑되는 매개변수의 경우에는 기본생성자 + setter를 통해 값이 할당됨
@Getter
@Setter
@NoArgsConstructor
public class ChatRequestDto {

    private Long roomId;
    private String message;


}

package ShareMarket.sharemarket.dto;

import org.junit.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class HomeResponseDtoTest {

    @Test
    //given, when, then형식으로 테스트하는것이 일반적
    public void 롬복_기능_테스트(){
        //given
        String name = "test";
        int amount = 1000;

        //when
        HomeResponseDto dto = new HomeResponseDto(name, amount);

        //then
        //assertThat() -> 검증하고싶은 대상을 메소드 인자로 받는다. (Junit거 말고 assertj꺼를 사용하는것을 추천)
        //isEqualTo() -> 인자값과 assertThat의 값이 같을떄만 성공
        assertThat(dto.getName()).isEqualTo(name); // 롬복의 @Getter 어노테이션으로 자동으로 get메소드가 생성되는것을 확인함.
        assertThat(dto.getAmount()).isEqualTo(amount);

    }
}
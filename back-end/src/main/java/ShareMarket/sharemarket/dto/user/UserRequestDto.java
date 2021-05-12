package ShareMarket.sharemarket.dto.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
// 회원가입 정보를 받기위한 DTO 데이터
public class UserRequestDto {

    private String username;
    private String password;
    private String email;
    private String addr;

}

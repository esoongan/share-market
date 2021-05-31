package ShareMarket.sharemarket.dto.user;


import ShareMarket.sharemarket.domain.user.User;
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



    public UserRequestDto(User entity) {
        this.username = entity.getUsername();
        this.password = entity.getPassword();
        this.email = entity.getEmail();
        this.addr = entity.getAddr();
    }

    public UserRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}

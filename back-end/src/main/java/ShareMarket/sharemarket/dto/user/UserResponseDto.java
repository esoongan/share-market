package ShareMarket.sharemarket.dto.user;

import ShareMarket.sharemarket.domain.user.User;
import lombok.Getter;

@Getter
public class UserResponseDto {

    private Long id;
    private String username;
    private String password;
    private String email;
    private String addr;

    public UserResponseDto(User entity) {
        this.id = entity.getId();
        this.username = entity.getUsername();
        this.password = entity.getPassword();
        this.email = entity.getEmail();
        this.addr = entity.getAddr();
    }

}

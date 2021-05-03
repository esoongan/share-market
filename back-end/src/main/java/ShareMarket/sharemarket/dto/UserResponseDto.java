package ShareMarket.sharemarket.dto;

import ShareMarket.sharemarket.domain.users.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@RequiredArgsConstructor
@Getter
public class UserResponseDto {

    private String username;
    private String password;
    private String email;
    private String addr;

    public UserResponseDto(User entity) {
        this.username = entity.getUsername();
        this.password = entity.getPassword();
        this.email = entity.getEmail();
        this.addr = entity.getAddr();
    }

}

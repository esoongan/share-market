package ShareMarket.sharemarket.domain.users;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@RequiredArgsConstructor
public enum MemberType implements GrantedAuthority {
    USER("ROLE_USER");

    @Getter
    private final String type;

    @Override
    public String getAuthority() {
        return type;
    }
}

package ShareMarket.sharemarket.domain.user;


// 실제 회원정보에 해당하는 클래스

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/*
SpringSecurity는 UserDetails객체를 통해 권한정보를 관리하므로 UserDetails 인터페이스 구현하고 이를 통해 DB에 저장된 계정과 인증검사를 할 수 있다.
Entity와 UserDetails는 구분할수도 같은클래수에서도 관리할수있지만, 이 플젝에서는 같은클래스에서 관리하도록 함
 */

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Entity
public class User implements UserDetails {

    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment로 pk자동생성
    private Long id;

    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String addr;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<MemberType> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getUsername(){
        return username;
    }

    @Override
    public String getPassword(){
        return password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

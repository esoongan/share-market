package ShareMarket.sharemarket.domain.users;


// 실제 회원정보에 해당하는 클래스

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;


@Entity
public class UserAccount {

    @Id // pk
    private Long id;

    private String username;
    private String email;
    private String password;
    private String location;

    // id get/set
    public Long getId(){
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    // username get/set
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }

    //email get/set
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    //password get/set
    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass()!=obj.getClass()) return false;
        UserAccount userAccount = (UserAccount) obj;
        return id.equals(userAccount.id) && username.equals(userAccount.username) &&
                email.equals(userAccount.email) &&
                password.equals(userAccount.password) &&
                location.equals(userAccount.location);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, email, password,location);


    }
}

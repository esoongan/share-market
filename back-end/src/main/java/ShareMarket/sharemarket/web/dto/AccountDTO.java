package ShareMarket.sharemarket.web.dto;


// 회원가입 정보를 받기위한 DTO 데이터
public class AccountDTO {

    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public String getPassword(){
        return password;
    }
    public void setPassword(){
        this.password = password;
    }
}

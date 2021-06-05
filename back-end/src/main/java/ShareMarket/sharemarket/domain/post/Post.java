package ShareMarket.sharemarket.domain.post;

import ShareMarket.sharemarket.domain.BaseTimeEntity;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.post.PostUpdateDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor // 기본생성자 자동생성 -> public Posts() {}와 같은효과 -> JPA를 사용하기위해서는 맨밑에처럼 생성자를 따로 생성하더라도 매개변수없는 기본생성자는 필수임
@Entity // JPA가 관리할 테이블이다. -> 테이블과 링크될 클래스임을 나타냄
public class Post extends BaseTimeEntity {


    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment로 pk자동생성
    private Long id;  // mysql 기준으로 long - bigint

//  private String user_id; // FK - 작성자 username(PK아님 - 유니크키임) ---> 아래로 수정함

    //다른 테이블과의 조인을 지정
    // 여러개의 포스트가 하나의 user를 가지므로 ManyToOne
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    // name of foreign key column in post entity
    @JoinColumn(name="userId") // 매핑할 외래키 이름
    private User user;

    @Column(length = 500, nullable = false) // 컬럼 어노테이션은 굳이 선언하지않아도 해당클래스 필드는 모두 컬럼이 되지만 추가변경이 필요한 옵션이잇을때 사용 (여기서는 문자열이 원래 VARCHAR(255)인데 500으로 늘림)
    private String title; //제목

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content; // 본문내용

    private String category;
    private Integer price;
    private Integer deposit;


    @Builder // 해당 클래스의 빌더패턴 클래스 생성 -> 생성자 상단에 선언시 생성자에 포함된 필드만 빌더에 포함 -> 빌더를 이용해 데이터 삽입
    public Post(User user, String title, String content, String category, Integer price, Integer deposit){
        this.user = user;
        this.title = title;
        this.content = content;
        this.category = category;
        this.price = price;
        this.deposit = deposit;
    }

    //user는 그대로 두고 -> 주소도 당연히 그대로니까 여기에 포함X
    public void update(PostUpdateDto postUpdateDto) {
        this.title = postUpdateDto.getTitle();
        this.content = postUpdateDto.getContent();
        this.category = postUpdateDto.getCategory();
        this.price = postUpdateDto.getPrice();
        this.deposit = postUpdateDto.getDeposit();
    }

}

/* Entity클래스에서는 절대 Setter메소드를 만들지 않는다.
Setter가 없는상황에서 어떻게 값을 채워 DB에 insert하는가? -> 빌더클래스를 이용
 */

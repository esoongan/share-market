package ShareMarket.sharemarket.domain.posts;

import ShareMarket.sharemarket.domain.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor // 기본생성자 자동생성 -> public Posts() {}와 같은효과 -> 맨밑에처럼 생성자를 따로 생성하더라도 매개변수없는 기본생성자는 있는게 자바에서 좋은구조?라고 어디서 들엇던 기억이 어렴풋이남..
@Entity // JPA가 관리할 테이블이다. -> 테이블과 링크될 클래스임을 나타냄
public class Posts extends BaseTimeEntity {

    @Id // PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto-increment로 pk자동생성
    private Long id;  // mysql 기준으로 long - bigint

    @Column(length = 500, nullable = false) // 컬럼 어노테이션은 굳이 선언하지않아도 해당클래스 필드는 모두 컬럼이 되지만 추가변경이 필요한 옵션이잇을때 사용 (여기서는 문자열이 원래 VARCHAR(255)인데 500으로 늘림)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private String author;

    @Builder // 해당 클래스의 빌더패턴 클래스 생성 -> 생성자 상단에 선언시 생성자에 포함된 필드만 빌더에 포함 -> 빌더를 이용해 데이터 삽입
    public Posts(String title, String content, String author){
        this.title = title;
        this.content = content;
        this.author = author;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}

/* Entity클래스에서는 절대 Setter메소드를 만들지 않는다.
Setter가 없는상황에서 어떻게 값을 채워 DB에 insert하는가? -> 빌더클래스를 이용
 */

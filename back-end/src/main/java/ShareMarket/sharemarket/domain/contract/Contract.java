package ShareMarket.sharemarket.domain.contract;

import ShareMarket.sharemarket.domain.BaseTimeEntity;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Entity
public class Contract extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // pk (ContractId)

    //다른 테이블과의 조인을 지정
    // Post 1개당 여러개의 Contract : Contract입장에서 ManyToOne
    @ManyToOne(targetEntity = Post.class, fetch = FetchType.LAZY) // many-to-one일때는 성능문제로 지연로딩하는것이 좋다.
    @JoinColumn(name="postId") // 매핑할 외래키 이름
    private Post post;

    // 서버단에서 처리
    private Long sellerId; // 빌려주는사람 -> 게시글 작성자
    private Long buyerId; // 빌리는사람 -> 현재 요청을보낸, 토큰으로부터 정보추출

    // RequestBody에 담아서 요청
    private LocalDate startDate; // 시작날짜 -> 요청파라미터
    private LocalDate endDate;   // 종료날짜 -> 요청파라미터
    private String state;     // 거래상태 -> 클라로부터 요청파라미터

        /*
    수락 - accept
    초기상태 - default
    종료 - end (빌린기간이 끝난경우)
    거절 - refuse (? 필요한가)
     */

    @Builder
    public Contract(Post post, Long sellerId, Long buyerId, LocalDate startDate, LocalDate endDate, String state) {
        this.post = post;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.state = state;
    }

    public void update(String state) {
        this.state = state;
    }

}

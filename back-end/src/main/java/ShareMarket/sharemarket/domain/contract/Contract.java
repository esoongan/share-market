package ShareMarket.sharemarket.domain.contract;

import ShareMarket.sharemarket.domain.BaseTimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Contract extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // pk

    // RequestBody에 담아서 요청
    private Long postId; // 게시글번호

    // 서버단에서 처리
    private Long sellerId; // 빌려주는사람 -> 게시글 작성자
    private Long buyerId; // 빌리는사람 -> 현재 요청을보낸, 토큰으로부터 정보추출

    // RequestBody에 담아서 요청
    private String startDate; // 시작날짜 -> 요청파라미터
    private String endDate;   // 종료날짜 -> 요청파라미터
    private String state;     // 거래상태 -> 클라로부터 요청파라미터

        /*
    수락 - accept
    초기상태 - default
    종료 - end (빌린기간이 끝난경우)
    거절 - refuse (? 필요한가)
     */

    @Builder
    public Contract(Long postId, Long sellerId, Long buyerId, String startDate, String endDate, String state) {
        this.postId = postId;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.state = state;
    }
}

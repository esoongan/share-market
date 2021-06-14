package ShareMarket.sharemarket.dto.contract;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.Optional;

// Dto -> Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ContractRequestDto {

    private Long postId; // 게시글번호 (클라리언트로부터 받기위해 존재)
    private Post post; // Entity 에 저장할때 필요
    private User seller; // 빌려주는사람
    private User buyer; // 빌리는사람
    private LocalDate startDate; // 시작날짜
    private LocalDate endDate;   // 종료날짜
    private String state;

    public Contract toEntity(){
        return Contract.builder()
                .post(post)
                .seller(seller)
                .buyer(buyer)
                .startDate(startDate)
                .endDate(endDate)
                .state(state)
                .build();
    }
}

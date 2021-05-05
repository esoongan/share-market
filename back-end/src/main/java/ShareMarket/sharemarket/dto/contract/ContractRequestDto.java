package ShareMarket.sharemarket.dto.contract;

import ShareMarket.sharemarket.domain.contract.Contract;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

// Dto -> Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ContractRequestDto {

    private Long postId; // 게시글번호
    private Long sellerId; // 빌려주는사람
    private Long buyerId; // 빌리는사람
    private String startDate; // 시작날짜
    private String endDate;   // 종료날짜
    private String state;

    public Contract toEntity(){
        return Contract.builder()
                .postId(postId)
                .sellerId(sellerId)
                .buyerId(buyerId)
                .startDate(startDate)
                .endDate(endDate)
                .state(state)
                .build();
    }

}

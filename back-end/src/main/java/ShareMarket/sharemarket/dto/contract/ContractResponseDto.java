package ShareMarket.sharemarket.dto.contract;

import ShareMarket.sharemarket.domain.contract.Contract;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
// Entity -> Dto
public class ContractResponseDto {

    private Long id;
    private Long postId; // 게시글번호
    private Long sellerId; // 빌려주는사람
    private Long buyerId; // 빌리는사람
    private String startDate; // 시작날짜
    private String endDate;   // 종료날짜
    private String state;

    public ContractResponseDto(Contract entity){
        this.id = entity.getId();
        this.postId = entity.getPostId();
        this.sellerId = entity.getSellerId();
        this.buyerId = entity.getBuyerId();
        this.startDate  = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.state = entity.getState();
    }




}

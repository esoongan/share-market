package ShareMarket.sharemarket.dto.contract;

import ShareMarket.sharemarket.domain.contract.Contract;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
// Entity -> Dto
public class ContractResponseDto {

    private Long id;
    private Long postId; // 게시글번호
    private String postTitle;
    private String seller; // 빌려주는사람
    private String buyer; // 빌리는사람
    private LocalDate startDate; // 시작날짜
    private LocalDate endDate;   // 종료날짜
    private String state;

    public ContractResponseDto(Contract entity){
        this.id = entity.getId();
        this.postId = entity.getPost().getId();
        this.postTitle = entity.getPost().getTitle();
        this.seller = entity.getSeller().getUsername();
        this.buyer = entity.getBuyer().getUsername();
        this.startDate  = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.state = entity.getState();
    }




}

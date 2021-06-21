package ShareMarket.sharemarket.dto.contract;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.dto.file.FileResponseDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
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
    @JsonProperty("thumbnail")
    private FileResponseDto fileResponseDto;
    private String seller; // 빌려주는사람
    private String buyer; // 빌리는사람
    private LocalDate startDate; // 시작날짜
    private LocalDate endDate;   // 종료날짜
    private String state;

    // 생성자 - 사용x
    public ContractResponseDto(Contract entity, FileResponseDto fileResponseDto){
        this.id = entity.getId();
        this.postId = entity.getPost().getId();
        this.postTitle = entity.getPost().getTitle();
        this.fileResponseDto = fileResponseDto;
        this.seller = entity.getSeller().getUsername();
        this.buyer = entity.getBuyer().getUsername();
        this.startDate  = entity.getStartDate();
        this.endDate = entity.getEndDate();
        this.state = entity.getState();
    }


    @Builder
    public ContractResponseDto(Long id, Long postId, String postTitle, FileResponseDto fileResponseDto, String seller, String buyer, LocalDate startDate, LocalDate endDate, String state) {
        this.id = id;
        this.postId = postId;
        this.postTitle = postTitle;
        this.fileResponseDto = fileResponseDto;
        this.seller = seller;
        this.buyer = buyer;
        this.startDate = startDate;
        this.endDate = endDate;
        this.state = state;
    }
}

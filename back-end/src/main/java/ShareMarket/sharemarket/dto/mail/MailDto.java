package ShareMarket.sharemarket.dto.mail;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MailDto {
    private String address;
    private String message;


    public MailDto(ContractRequestDto contractRequestDto) {
        this.address = contractRequestDto.getSeller().getEmail();
        this.message = contractRequestDto.getBuyer().getUsername() + "님으로부터 새로운 거래요청이 들어왔습니다." +
                "\n게시글제목 : " + contractRequestDto.getPost().getTitle() +
                "\n대여기간 : " + contractRequestDto.getStartDate() + "~" + contractRequestDto.getEndDate();
    }
}

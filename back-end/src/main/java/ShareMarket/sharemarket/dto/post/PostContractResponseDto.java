package ShareMarket.sharemarket.dto.post;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@Getter
@Setter
@Data
public class PostContractResponseDto {

//    private Long postId;
    private LocalDate startDate;
    private LocalDate endDate;

}

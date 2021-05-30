package ShareMarket.sharemarket.dto.post;

import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@Data
public class PostContractResponseDto {

//    private Long postId;
    private LocalDate startDate;
    private LocalDate endDate;

}

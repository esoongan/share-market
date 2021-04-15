package ShareMarket.sharemarket.dto;

import lombok.Data;

import java.time.LocalDateTime;

// 페이징을 위한 DTO객체
@Data
public class PagingDto {

    private Long id;
    private String title;
    private String user_id;
    private LocalDateTime createdDate;

    public PagingDto(Long id, String title, String user_id, LocalDateTime createdDate) {
        this.id = id;
        this.title = title;
        this.user_id = user_id;
        this.createdDate = createdDate;
    }
}

package ShareMarket.sharemarket.dto.paging;

import lombok.Data;

import java.time.LocalDateTime;

// 페이징을 위한 DTO객체
@Data
public class PagingDto {

    private Long id; // 게시글의 id
    private String title; //게시글 제목
    private String userId; // 게시글 작성자
    private String category;
    private String addr;
    private LocalDateTime createdDate; // 게시글 작성일 및 시간

    public PagingDto(Long id, String title, String userId, String category, String addr, LocalDateTime createdDate) {
        this.id = id;
        this.title = title;
        this.userId = userId;
        this.category = category;
        this.addr = addr;
        this.createdDate = createdDate;
    }
}

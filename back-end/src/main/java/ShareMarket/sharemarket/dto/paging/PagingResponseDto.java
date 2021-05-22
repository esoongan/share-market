package ShareMarket.sharemarket.dto.paging;

import ShareMarket.sharemarket.dto.file.FileResponseDto;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

// Getter/Setter없이 Property를 읽도록 하는 방법
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@AllArgsConstructor // -> 빌더패턴으로 고치기
public class PagingResponseDto {

    private Long id; // 게시글의 id
    @JsonProperty("thumbnail")
    private FileResponseDto fileResponseDto;
    private String title; //게시글 제목
    private String userId; // 게시글 작성자
    private String category;
    private String addr;
    private LocalDateTime createdDate; // 게시글 작성일 및 시간
}

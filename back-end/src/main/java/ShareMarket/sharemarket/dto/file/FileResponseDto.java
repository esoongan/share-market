package ShareMarket.sharemarket.dto.file;

import ShareMarket.sharemarket.domain.file.File;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.NoArgsConstructor;


@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
// jsonAutoDetect : No serializer found for class 에러해결방법 -> serializer하는 과정에서 기본으로 접근제한자가 public이거나 getter/setter를 이용하기때문에 인스턴스 필드를 private으로 선언하면 json변환과정에서 에러가 남
@NoArgsConstructor
public class FileResponseDto {

    private Long id;
    private Long postId;
    private String origFilename;
    private String filename;
    private String filepath;

    // FileResponseDto -> Entity객체를 인자로 줘서 FileDto객체로 만들어주는 생성자
    public FileResponseDto(File entity) {
        this.id = entity.getId();
        this.postId = entity.getPostId();
        this.origFilename = entity.getOrigFilename();
        this.filename = entity.getFilename();
        this.filepath = entity.getFilepath();
    }
}

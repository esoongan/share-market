package ShareMarket.sharemarket.dto;


import ShareMarket.sharemarket.domain.File.File;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FileDto {
    private Long post_id;
    private String origFilename;
    private String filename;
    private String filepath;

    // FileRequestDto -> Dto에 담긴 값으로 Entity객체를 만들고 디비에 저장하기위한 메소드
    public File toEntity(){
        return File.builder()
                .post_id(post_id)
                .origFilename(origFilename)
                .filename(filename)
                .filepath(filepath)
                .build();
    }

    // FileResponseDto -> Entity객체를 인자로 줘서 FileDto객체로 만들어주는 생성자
    public FileDto(File entity) {
        this.post_id = entity.getPost_id();
        this.origFilename = entity.getOrigFilename();
        this.filename = entity.getFilename();
        this.filepath = entity.getFilepath();
    }
}

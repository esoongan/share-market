package ShareMarket.sharemarket.domain.file;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class File { //사진(파일) 엔티티클래스

    // 파일번호 - PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long postId;

    // 원본파일명
    @Column(nullable = false) // null값 허용x
    private String origFilename;

    // 서버에 저장될 파일명
    @Column(nullable = false) // null값 허용x
    private String filename;

    @Column(nullable = false)
    private String filepath;


    @Builder
    public File(Long postId, String origFilename, String filename, String filepath) {
        this.postId = postId;
        this.origFilename = origFilename;
        this.filename = filename;
        this.filepath = filepath;
    }

}

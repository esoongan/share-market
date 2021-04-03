package ShareMarket.sharemarket.domain.File;

import ShareMarket.sharemarket.domain.posts.Post;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.junit.ClassRule;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class File { //사진(파일) 엔티티클래스

    // 파일번호 - PK
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 게시글 번호 - FK
//    @ManyToOne
//    @JoinColumn(name="post_id")
//    private Post post;

    @Column(nullable = false)
    private Long post_id;

    // 원본파일명
    @Column(nullable = false) // null값 허용x
    private String origFilename;

    // 서버에 저장될 파일명
    @Column(nullable = false) // null값 허용x
    private String filename;

    @Column(nullable = false)
    private String filepath;


    @Builder
    public File(Long post_id, String origFilename, String filename, String filepath) {
        this.post_id = post_id;
        this.origFilename = origFilename;
        this.filename = filename;
        this.filepath = filepath;
    }

}

package ShareMarket.sharemarket.domain.post;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostRepositoryTest {

    @Autowired
    PostRepository postRepository;

    @After // Junit에서 단위테스트가 끝날때마다 수행되는 메소드를 지정
    public void cleanup(){
        postRepository.deleteAll();
    }

    @Test
    public void 게시글저장_불러오기(){
        //given (이러한 조건에서)
        String title = "테스트 게시글";
        String content = "테스트 본문";

        // save함수 -> posts테이블에 insert/update쿼리를 실행함
        // id값이 있다면 update가, 없아면 insert쿼리가 실행됨
        postRepository.save(Post.builder()
                .title(title)
                .content(content)
                //.author("seungjin9777@gmail.com")
                .build()
        );

        //when (어떤것을 수행했을때)
        List<Post> postList = postRepository.findAll();

        //then (결과체크)
        Post post = postList.get(0);
        assertThat(post.getTitle()).isEqualTo(title);
        assertThat(post.getContent()).isEqualTo(content);
    }

    @Test
    public void 키워드검색(){

        //given
        String title = "자전거 팔아요";
        String content = "자전거 좋아요";

        //게시글저장
        postRepository.save(Post.builder()
                .title(title)
                .content(content)
                .build());
        postRepository.save(Post.builder()
                .title("울랄라")
                .content("호호호")
                .build());

        //when
        String keyword = "자전거";

        Page<Post> postPage = postRepository
                .findAllByTitleContainingOrContentContaining(keyword, keyword, Pageable.unpaged());

        //then
        System.out.println(postPage);

    }

}

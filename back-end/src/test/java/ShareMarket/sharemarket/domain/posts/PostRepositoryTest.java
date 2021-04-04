package ShareMarket.sharemarket.domain.posts;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostRepositoryTest {

    @Autowired
    PostsRepository postsRepository;

    @After // Junit에서 단위테스트가 끝날때마다 수행되는 메소드를 지정
    public void cleanup(){
        postsRepository.deleteAll();
    }

    @Test
    public void 게시글저장_불러오기(){
        //given (이러한 조건에서)
        String title = "테스트 게시글";
        String content = "테스트 본문";

        // save함수 -> posts테이블에 insert/update쿼리를 실행함
        // id값이 있다면 update가, 없아면 insert쿼리가 실행됨
        postsRepository.save(Post.builder()
                .title(title)
                .content(content)
                //.author("seungjin9777@gmail.com")
                .build()
        );

        //when (어떤것을 수행했을때)
        List<Post> postList = postsRepository.findAll();

        //then (결과체크)
        Post post = postList.get(0);
        assertThat(post.getTitle()).isEqualTo(title);
        assertThat(post.getContent()).isEqualTo(content);
    }
}

package ShareMarket.sharemarket.controller;


import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.users.User;
import ShareMarket.sharemarket.dto.UserRequestDto;
import ShareMarket.sharemarket.service.PostsService;
import ShareMarket.sharemarket.dto.PostsResponseDto;
import ShareMarket.sharemarket.dto.PostsSaveRequestDto;
import ShareMarket.sharemarket.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostsService postsService;

    // 게시글 작성
    @PostMapping("/api/posts")
    public ResponseEntity<Post> savePost(@RequestBody PostsSaveRequestDto postsSaveRequestDto) throws  URISyntaxException{ //postsavedto객체에 담긴 정보를 저장한다.
        Post post = postsService.save(postsSaveRequestDto);
        URI url = new URI(String.format("/posts/$s", post.getId()));
        return ResponseEntity.created(url).body(post);
    }

    // 게시글 수정
    @PutMapping("/api/posts/{id}")
    public Long updatePost(@PathVariable Long id, @RequestBody PostsUpdateRequestDto requestDto) {
        return postsService.update(id, requestDto);
    }

//    @DeleteMapping("/api/v1/posts/{id}")
//    public Long delete(@PathVariable Long id) {
//        postsService.delete(id);
//        return id;
//    }

    //게시글 하나 조회
    @GetMapping("/api/posts/{id}")
    public PostsResponseDto findById(@PathVariable Long id) {
        return postsService.findById(id);
    }

//    @GetMapping("/api/v1/posts/list")
//    public List<PostsListResponseDto> findAll() {
//        return postsService.findAllDesc();
//    }
}
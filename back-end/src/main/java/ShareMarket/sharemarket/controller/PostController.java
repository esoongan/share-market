package ShareMarket.sharemarket.controller;


import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.dto.PostsListResponseDto;
import ShareMarket.sharemarket.service.PostsService;
import ShareMarket.sharemarket.dto.PostsResponseDto;
import ShareMarket.sharemarket.dto.PostsRequestDto;
import ShareMarket.sharemarket.dto.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostsService postsService;


    // 게시글 저장 _ 로그인한 유저만 가능
    @PostMapping("/user/api/posts")
    public ResponseEntity<Post> savePost(@RequestBody PostsRequestDto postsRequestDto, Authentication authentication) throws URISyntaxException { //postsavedto객체에 담긴 정보를 저장한다.
        Post post = postsService.save(postsRequestDto);
        URI url = new URI(String.format("/posts/$s", post.getId()));
        return ResponseEntity.created(url).body(post);
    }

    // 게시글 수정 _ 로그인한 유저중에서도 본인글만 가능
    @PatchMapping("/user/api/posts/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody PostsRequestDto requestDto) {
        return postsService.update(id, requestDto); //
    }

    // 게시글 삭제 _ 로그인한 유저중에서도 본인글만 가능
    // 만약 서버에서 체크해야한다면 current를 이용해서 토큰에서 사용자정보를 조회한뒤, 해당 사용자가 게시글의 사용자와 같으면 성공 아니면 권한없음 반환
    @DeleteMapping("/user/api/posts/{id}")
    public Long delete(@PathVariable Long id) {
        postsService.delete(id);
        return id;
    }

    //게시글 하나 조회
    @CrossOrigin("*")
    @GetMapping("/api/posts/{id}")
    public PostsResponseDto findById(@PathVariable Long id) {
        log.info("api호출");
        return postsService.findById(id);
    }

//    //게시글 리스트 조회
//    @GetMapping("/api/v1/posts/list")
//    public List<PostsListResponseDto> findAll() {
//        return postsService.findAllDesc();
//    }

}


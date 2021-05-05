package ShareMarket.sharemarket.controller;


import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.service.PostService;
import ShareMarket.sharemarket.dto.post.PostResponseDto;
import ShareMarket.sharemarket.dto.post.PostRequestDto;
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

    private final PostService postService;


    // 게시글 저장 _ 로그인한 유저만 가능
    @PostMapping("/uauth/api/post")
    public ResponseEntity<PostResponseDto> savePost(@RequestBody PostRequestDto postRequestDto, Authentication authentication) throws URISyntaxException { //postsavedto객체에 담긴 정보를 저장한다.
        PostResponseDto postResponseDto = postService.save(postRequestDto, authentication);
        URI url = new URI(String.format("/posts/$s", postResponseDto.getId()));
        return ResponseEntity.created(url).body(postResponseDto);
    }

    // 게시글 수정 _ 로그인한 유저중에서도 본인글만 가능(프론트에서 체크)
    @PutMapping("/uauth/api/post/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody PostRequestDto postRequestDto) {
        return postService.update(id, postRequestDto); //
    }

    // 게시글 삭제 _ 로그인한 유저중에서도 본인글만 가능 (프론트에서 체크)
    // 만약 서버에서 체크해야한다면 current를 이용해서 토큰에서 사용자정보를 조회한뒤, 해당 사용자가 게시글의 사용자와 같으면 성공 아니면 권한없음 반환
    @DeleteMapping("/uauth/api/post/{id}")
    public Long delete(@PathVariable Long id) {
        postService.delete(id);
        return id;
    }

    //게시글 하나 조회
    @GetMapping("/api/post/{id}")
    public PostResponseDto findById(@PathVariable Long id) {
        log.info("api호출");
        return postService.findById(id);
    }

    //게시글 거래완료된 날짜 조회 by pk,month

}


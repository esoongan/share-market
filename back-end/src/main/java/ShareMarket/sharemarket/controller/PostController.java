package ShareMarket.sharemarket.controller;


import ShareMarket.sharemarket.dto.post.PostContractResponseDto;
import ShareMarket.sharemarket.dto.post.PostRequestDto;
import ShareMarket.sharemarket.dto.post.PostResponseDto;
import ShareMarket.sharemarket.dto.post.PostUpdateDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@Slf4j
@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PostController {

    private final PostService postService;


    // 게시글 저장 _ 로그인한 유저만 가능
    @PostMapping("/uauth/api/post")
    //ResponseEntity : 응답헤더에 대한 구현체로, 스프링에서 제공하는 클래스
    public ResponseEntity<PostResponseDto> savePost(@RequestBody PostRequestDto postRequestDto, Authentication authentication) throws URISyntaxException { //postsavedto객체에 담긴 정보를 저장한다.
        PostResponseDto postResponseDto = postService.save(postRequestDto, authentication);
//        URI url = new URI(String.format("/posts/$d", postResponseDto.getId()));
//        return ResponseEntity.created(url).body(postResponseDto);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.CREATED,
                HttpResponseMessage.CREATE_POST,
                postResponseDto), HttpStatus.CREATED);
    }

    // 게시글 수정 _ 로그인한 유저중에서도 본인글만 가능(프론트에서 체크)
    @PutMapping("/uauth/api/post/{id}")
    public PostResponseDto updatePost(@PathVariable Long id, @RequestBody PostUpdateDto postUpdateDto) {
        return postService.update(id, postUpdateDto); //
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
        return postService.findById(id);
    }

    //게시글 거래완료된 날짜 조회 by pk,month
//    @GetMapping("/api/post/{id}/contract")
//    public List<PostContractResponseDto> findContractByPostId(@PathVariable Long id) {
//        return postService.findAcceptContractByPostId(id);
//    }

    @GetMapping("/api/post/{id}/contract")
    public ResponseEntity<List<PostContractResponseDto>> findContractByPostId(@PathVariable Long id) {
        List<PostContractResponseDto> responseDtoList = postService.findAcceptContractByPostId(id);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                id + HttpResponseMessage.READ_ACCEPT_CONTRACT,
                responseDtoList), HttpStatus.OK);
    }

}


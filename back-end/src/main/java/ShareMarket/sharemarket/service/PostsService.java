package ShareMarket.sharemarket.service;


import ShareMarket.sharemarket.domain.File.FileRepository;
import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.posts.PostsRepository;
import ShareMarket.sharemarket.dto.*;
import ShareMarket.sharemarket.exception.ApiExceptionHandler;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor // Repository를 주입하기 위해 사용
@Service
public class PostsService {
    private final PostsRepository postsRepository;
    private final FileRepository fileRepository;
    private final ApiExceptionHandler apiExceptionHandler;

    // 게시글 저장
    @Transactional
    public Post save(PostsRequestDto postsRequestDto){
        //JpaRepository에 정의된 메소드save() -> DB에 INSERT와 UPDATE를 담당한다. (자동생성)
        //매개변수로는 ""Entity""를 전달함
        return postsRepository.save(postsRequestDto.toEntity()); // Post Entity객체
    }

    // 게시글 수정
    @Transactional
    public Post update(Long id, PostsRequestDto postsRequestDto) {
        // id로 디비에서 게시글을 찾고
        Post post = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        // 전달받은 게시글로 업데이트
        post.update(postsRequestDto);
        return post; // 엔티티객체 바로 리턴하면 안되서 추후에 수정해야함.
    }

    // 게시글 삭제
    @Transactional
    public void delete (Long id) {
        Post post = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));

        postsRepository.delete(post);
    }

    // 게시글 1개 조회
    @Transactional(readOnly = true)
    public PostsResponseDto findById(Long id) {
        Post post = postsRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));

        return new PostsResponseDto(post); // 바로 entity를 응답하지 않고 Dto객체로 한번 감싸서 리턴
    }

//    // 게시글 목록 조회
//    @Transactional(readOnly = true)
//    public List<PostsListResponseDto> findAllDesc() {
//        return postsRepository.findAllDesc().stream()
//                .map(PostsListResponseDto::new)
//                .collect(Collectors.toList());
//    }
}

package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.post.PostSpecification;
import ShareMarket.sharemarket.dto.paging.PagingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;

@RequiredArgsConstructor
@Service
public class PagingService {

    private final PostRepository postsRepository;
    private final PostService postService;
    private final UserService userService;

    public Page<PagingDto> searchPaging(String keyword, String category, String addr, Pageable pageable) {
        Specification<Post> spec = null;
        // 키워드 - 제목이나 내용
        if (keyword != null) {
            spec = PostSpecification.likeTitle(keyword).or(PostSpecification.likeContent(keyword));
        }
        // 카테고리
        if (category != null) {
            // 키워드에서 안걸리고 카테고리에서 처음 걸린경우
            if (spec == null) {
                spec = PostSpecification.equalCategory(category);
            }else{ // 키워드 + 카테고리
                spec = spec.and(PostSpecification.equalCategory(category));
            }
        }
        //지역
        if (addr != null) {
            // 키워드, 카테고리에서 안걸리고 addr에서 처음 걸린경우
            if (spec == null) {
                // isAddr로 수정~~~~~~~~
                spec = PostSpecification.equalAddr(addr);
            }else{ // 키워드나 카테고리 어디서든 걸린경우
                spec = spec.and(PostSpecification.equalAddr(addr));
            }
        }
        // 검색조건없이 default페이징 요청인 경우
        if (spec == null) {
            return paging(pageable);
        }
        Page<Post> postPage = postsRepository.findAll(spec, pageable);

        return postPage.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        post.getUser().getAddr(),
                        post.getCreatedDate()
                ));
    }

    // default : 페이징으로 게시글 반환
    public Page<PagingDto> paging(Pageable pageable){

        Page<Post> postList = postsRepository.findAll(pageable);

        // postList에 담겨있는 각각의 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        post.getUser().getAddr(),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }

    //기간 테스트
    public Page<PagingDto> testStartDate(Date startDate, Pageable pageable) {
        Specification<Post> spec = PostSpecification.beforeStartDate(startDate);
        Page<Post> postList = postsRepository.findAll(spec, pageable);

        // postList에 담겨있는 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        postService.getUserDtoByPostPk(post.getId()).getAddr(),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }

    // 작성자랑 같은지 찾는거
    public Page<PagingDto> pagingByWriter(Pageable pageable, Authentication authentication){

        Specification<Post> spec = PostSpecification.equalWriter(userService.getUserByToken(authentication.getPrincipal()));

        Page<Post> postPage = postsRepository.findAll(spec, pageable);

        return postPage.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        post.getUser().getAddr(),
                        post.getCreatedDate()
                ));
    }
}

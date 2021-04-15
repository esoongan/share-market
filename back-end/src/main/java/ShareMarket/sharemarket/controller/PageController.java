package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.posts.PostsRepository;
import ShareMarket.sharemarket.dto.PagingDto;
import ShareMarket.sharemarket.service.PagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 페이지별로 게시글목록을 조회
@RequiredArgsConstructor
@RestController
public class PageController {

    private final PagingService pagingService;

    @Autowired
    private final PostsRepository postsRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page")
    public Page<PagingDto> paging(@PageableDefault(size=5, sort = "createdDate") Pageable pageRequest) {
        return pagingService.paging(pageRequest);
    }
//    public Page<PagingDto> paging(@PageableDefault(size=5, sort = "createdTime") Pageable pageRequest){
//
//        Page<Post> postList = postsRepository.findAll(pageRequest);
//
//        Page<PagingDto> pagingList = postList.map(
//                post -> new PagingDto(
//                        post.getId(),
//                        post.getTitle(),
//                        post.getUser_id(),
//                        post.getCreatedDate()
//                ));
//        return pagingList;
//    }
}

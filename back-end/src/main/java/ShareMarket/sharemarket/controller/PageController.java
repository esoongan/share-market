package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.posts.PostsRepository;
import ShareMarket.sharemarket.dto.PagingDto;
import ShareMarket.sharemarket.service.PagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// 페이지별로 게시글목록을 조회
@RequiredArgsConstructor
@RestController
public class PageController {

    private final PagingService pagingService;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page")
    public Page<PagingDto> paging(@PageableDefault(size = 10, sort = "createdDate") Pageable pageRequest) {
        return pagingService.paging(pageRequest);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page/search")
    public Page<PagingDto> pagingByKeyword(@RequestParam String keyword,
                                           @PageableDefault(size = 10, sort = "createdDate") Pageable pageRequest) {
        return pagingService.pagingByKeyword(keyword, pageRequest);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page/category")
    public Page<PagingDto> pagingByCategory(@RequestParam String category,
                                           @PageableDefault(size = 10, sort = "createdDate") Pageable pageRequest) {
        return pagingService.pagingByCategory(category, pageRequest);

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page/addr")
    public Page<PagingDto> pagingByAddr(@RequestParam String addr,
                                            @PageableDefault(size = 10, sort = "createdDate") Pageable pageRequest) {
        return pagingService.pagingByAddr(addr, pageRequest);

    }

}

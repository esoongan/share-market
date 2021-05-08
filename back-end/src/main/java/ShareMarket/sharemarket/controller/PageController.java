package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.paging.PagingDto;
import ShareMarket.sharemarket.service.PagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// 페이지별로 게시글목록을 조회
@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PageController {

    private final PagingService pagingService;

    //컨트롤러메소드에 pageble타입의 파라미터가 존재하면 요청파라미터를 토대로 PageableHandlerMethodArgumentResolver가 pageRequest를 생성함

    @GetMapping("/api/post/page")
    public Page<PagingDto> getPaging(@PageableDefault(sort = "createdDate",direction = Sort.Direction.DESC) Pageable pageRequest,
                                     @RequestParam(required = false) String keyword,
                                     @RequestParam(required = false) String category,
                                     @RequestParam(required = false) String addr
                                     ){

        return pagingService.searchPaging(keyword,category,addr,pageRequest);

//        // default페이징 (아무인자없이)
//        if (keyword==null && category==null && addr == null) {
//                return pagingService.searchPaging(keyword,null,null,pageRequest);
//        } // 키워드로 검색
//        else if(keyword!=null && category==null && addr == null){
//
//        }// 카테고리로 검색
//        else if(category!=null && keyword==null && addr == null){
//            return pagingService.pagingByCategory(category, pageRequest);
//        } // 지역으로 검색
//        else if(keyword==null && category==null && addr != null){
//
//        } // 키워드 + 카테고리
//        else if(keyword!=null && category!=null && addr == null){
//
//        } // 키워드 + 지역
//        else if(keyword!=null && category==null && addr != null){
//
//        } // 카테고리 + 지역
//        else if(keyword==null && category!=null && addr != null){
//
//        } // 키워드 + 카테고리 + 지역
//        else{
//            return
//        }
    }



    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page")
    public Page<PagingDto> paging(@PageableDefault(sort = "createdDate",direction = Sort.Direction.DESC) Pageable pageRequest) {
        return pagingService.paging(pageRequest);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page/search")
    public Page<PagingDto> pagingByKeyword(@RequestParam String keyword,
                                           @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageRequest) {
        return pagingService.pagingByKeyword(keyword, pageRequest);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page/category")
    public Page<PagingDto> pagingByCategory(@RequestParam String category,
                                           @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageRequest) {
        return pagingService.pagingByCategory(category, pageRequest);

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page/addr")
    public Page<PagingDto> pagingByAddr(@RequestParam String addr,
                                            @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageRequest) {
        return pagingService.pagingByAddr(addr, pageRequest);

    }

}

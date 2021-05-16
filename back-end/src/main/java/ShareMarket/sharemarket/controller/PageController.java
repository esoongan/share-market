package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.paging.PagingDto;
import ShareMarket.sharemarket.dto.paging.PagingResponseDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.PagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.time.LocalDate;

// 페이지별로 게시글목록을 조회
@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PageController {

    private final PagingService pagingService;

    //컨트롤러메소드에 pageble타입의 파라미터가 존재하면 요청파라미터를 토대로 PageableHandlerMethodArgumentResolver가 pageRequest를 생성함

    // 페이징 조회 통합 ( 디폴트 / 검색(키워드, 카테고리, 지역) 기간 추가 해야함)
    @GetMapping("/api/post/page")
    public ResponseEntity<Page<PagingDto>> getPaging(@PageableDefault(sort = "createdDate",direction = Sort.Direction.DESC) Pageable pageRequest,
                                    @RequestParam(required = false) String keyword,
                                    @RequestParam(required = false) String category,
                                    @RequestParam(required = false) String addr
                                     ){

        Page<PagingDto> pagingDtos =  pagingService.searchPaging(keyword,category,addr,pageRequest);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.READ_POST,
                pagingDtos), HttpStatus.OK);
    }

    // 토큰 소유자가 작성한 게시글페이징 조회
    @GetMapping("/uauth/api/post")
    public ResponseEntity<Page<PagingDto>> pagingByWriter(@PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageRequest,
                                                          Authentication authentication) {
        Page<PagingDto> pagingDtos = pagingService.pagingByWriter(pageRequest, authentication);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                "토큰소유자가 작성한 "+ HttpResponseMessage.READ_POST,
                pagingDtos), HttpStatus.OK);

    }

    // 썸네일 추가 테스트~~~
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page")
    public ResponseEntity<Page<PagingResponseDto>> paging(@PageableDefault(sort = "createdDate",direction = Sort.Direction.DESC) Pageable pageRequest) {
        Page<PagingResponseDto> pagingDtos =  pagingService.test(pageRequest);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.READ_POST,
                pagingDtos), HttpStatus.OK);
    }

    // 기간 테스트~~~~~~
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/api/posts/page/testDate")
    public Page<PagingDto> pagingByKeyword(@RequestParam String startDate,
                                           @PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageRequest) throws ParseException {
        java.text.SimpleDateFormat format = new java.text.SimpleDateFormat("yyyy-MM-dd");
        java.util.Date date = format.parse(startDate);
        return pagingService.testStartDate(date, pageRequest);
    }



}

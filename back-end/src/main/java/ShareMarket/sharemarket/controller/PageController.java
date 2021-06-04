package ShareMarket.sharemarket.controller;

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

import java.time.LocalDate;

// 페이지별로 게시글목록을 조회
@CrossOrigin
@RequiredArgsConstructor
@RestController
public class PageController {

    private final PagingService pagingService;

    //컨트롤러메소드에 pageble타입의 파라미터가 존재하면 요청파라미터를 토대로 PageableHandlerMethodArgumentResolver가 pageRequest를 생성함

    // 페이징 조회 통합 ( 디폴트 / 검색(키워드, 카테고리, 지역, 기간))
    @GetMapping("/api/post/page")
    public ResponseEntity<Page<PagingResponseDto>> getPaging(@PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageRequest,
                                                             @RequestParam(required = false) String keyword,
                                                             @RequestParam(required = false) String category,
                                                             @RequestParam(required = false) String addr,
                                                             @RequestParam(required = false) String start,
                                                             @RequestParam(required = false) String end) {


        Page<PagingResponseDto> pagingDtos = pagingService.searchPaging(keyword, category, addr, start, end, pageRequest);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.READ_POST,
                pagingDtos), HttpStatus.OK);
    }

    // 토큰 소유자가 작성한 게시글페이징 조회
    @GetMapping("/uauth/api/post")
    public ResponseEntity<Page<PagingResponseDto>> pagingByWriter(@PageableDefault(sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageRequest,
                                                          Authentication authentication) {
        Page<PagingResponseDto> pagingDtos = pagingService.pagingByWriter(pageRequest, authentication);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                "토큰소유자가 작성한 "+ HttpResponseMessage.READ_POST,
                pagingDtos), HttpStatus.OK);

    }

    //========================================================================================

    // 대여기간 검색 테스트~~~ (클라에서 사용하는거아님)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/test/api/post/page")
    public ResponseEntity<Page<PagingResponseDto>> paging(@PageableDefault(sort = "createdDate",direction = Sort.Direction.DESC) Pageable pageRequest,
                                                          @RequestParam(required = false) String start,
                                                          @RequestParam(required = false) String end) {
        // String -> LocalDate
        LocalDate startDate = LocalDate.parse(start);
        LocalDate endDate = LocalDate.parse(end);

        Page<PagingResponseDto> pagingDtos =  pagingService.test(pageRequest, startDate, endDate);

        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.READ_POST,
                pagingDtos), HttpStatus.OK);
    }


}

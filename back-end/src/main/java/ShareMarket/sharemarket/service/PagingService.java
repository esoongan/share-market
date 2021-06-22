package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.file.FileRepository;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.post.PostSpecification;
import ShareMarket.sharemarket.dto.file.FileResponseDto;
import ShareMarket.sharemarket.dto.paging.PagingResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class PagingService {

    private final PostRepository postsRepository;
    private final FileRepository fileRepository;
    private final ContractService contractService;
    private final UserService userService;

    @Transactional(readOnly = true) // Spring Data JPA - LazyInitialization 에러
    public Page<PagingResponseDto> searchPaging(String keyword, String category, String addr, String start, String end, Pageable pageable) {
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
                spec = PostSpecification.equalAddr(addr);
            }else{ // 키워드나 카테고리 어디서든 걸린경우
                spec = spec.and(PostSpecification.equalAddr(addr));
            }
        }
        // 대여기간
        if (start != null && end!=null) {
            // String -> LocalDate
            LocalDate startDate = LocalDate.parse(start);
            LocalDate endDate = LocalDate.parse(end);
            // 클라로부터 온 기간안에 accept인 거래가 있는 게시글목록들 ( 즉 빼야하는애들 )
            List<Long> postIdtoExclude = contractService.findPostIdtoExclude(startDate, endDate, "accept");
            log.info("제외시킬 게시글개수 : "+ String.valueOf(postIdtoExclude.size()));
            if (!postIdtoExclude.isEmpty()) {
                // 키워드, 카테고리, 지역에서 안걸리고 대여조건에서 처음 걸린경우
                if (spec == null) {
                    spec = PostSpecification.notEqualPostId(postIdtoExclude);
                }
                else {
                    spec = spec.and(PostSpecification.notEqualPostId(postIdtoExclude));
                }
            }
        }
        // 검색조건없이 default페이징 요청인 경우
        if (spec == null) {
            return paging(pageable);
        }

        Page<Post> postPage = postsRepository.findAll(spec, pageable);

        return postPage.map(
                post -> new PagingResponseDto(
                        post.getId(),
                        new FileResponseDto(fileRepository.findAllByPostId(post.getId()).get(0)),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        post.getUser().getAddr(),
                        post.getCreatedDate()
                ));
    }

    @Transactional(readOnly = true)
    // default : 페이징으로 게시글 반환
    public Page<PagingResponseDto> paging(Pageable pageable){

        Page<Post> postList = postsRepository.findAll(pageable);

        // postList에 담겨있는 각각의 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingResponseDto> pagingDtos = postList.map(
                post -> new PagingResponseDto(
                        post.getId(),
                        new FileResponseDto(fileRepository.findAllByPostId(post.getId()).get(0)),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        post.getUser().getAddr(),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }

    // 기간테스트
    public Page<PagingResponseDto> test(Pageable pageable, LocalDate startDate, LocalDate endDate) {
        log.info("SERIVICE TEST INVOKE");

        // 해당 기간에 accept인 거래가 잇는 contract찾기 --> 빼야할 게시글 아이디들이 담겨있는상태
        List<Long> postIdtoExclude = contractService.findPostIdtoExclude(startDate, endDate, "accept");
        log.info(String.valueOf(postIdtoExclude.size()));

        // PostSpecification에 만들어놓은 조건으로 spec생성 --> 게시글 아이디가 담긴 리스트(제외시킬 게시글목록들)를 받아 해당리스트에 없는 게시글만 찾는 spec(not in)
        Specification<Post> spec = PostSpecification.notEqualPostId(postIdtoExclude);
        log.info("not equal post id스펙 성공?!");

        // spec실행 -> 대여가능한 게시글 찾음
        Page<Post> postPage = postsRepository.findAll(spec, pageable);
        log.info("postList"+String.valueOf(postPage.getTotalPages()));


        // postList에 담겨있는 각각의 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingResponseDto> pagingDtos = postPage.map(
                post -> new PagingResponseDto(
                        post.getId(),
                        new FileResponseDto(fileRepository.findAllByPostId(post.getId()).get(0)),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        post.getUser().getAddr(),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }


    // 내가쓴글 조회
    @Transactional(readOnly = true)
    public Page<PagingResponseDto> pagingByWriter(Pageable pageable, Authentication authentication){

        Specification<Post> spec = PostSpecification.equalWriter(userService.getUserByToken(authentication.getPrincipal()));

        Page<Post> postPage = postsRepository.findAll(spec, pageable);

        return postPage.map(
                post -> new PagingResponseDto(
                        post.getId(),
                        new FileResponseDto(fileRepository.findAllByPostId(post.getId()).get(0)),
                        post.getTitle(),
                        post.getUser().getUsername(),
                        post.getCategory(),
                        post.getUser().getAddr(),
                        post.getCreatedDate()
                ));
    }
}

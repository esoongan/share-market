package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.posts.PostsRepository;
import ShareMarket.sharemarket.dto.PagingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class PagingService {

    private final PostsRepository postsRepository;
    private final PostsService postsService;

    // 페이징으로 게시글 반환
    public Page<PagingDto> paging(Pageable pageable){

        Page<Post> postList = postsRepository.findAll(pageable);

        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser_id(),
                        post.getCategory(),
                        postsService.findAddrByPost(post.getId()),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }

    // 제목, 내용에서 키워드검색
    // 키워드와 Pageable을 인자로 받아서 레포지토리에서 제목, 내용안의 키워드로 검색하고 결과 게시글들을 PageDto객체로 반환
    public Page<PagingDto> pagingByKeyword(String keyword, Pageable pageable) {

        Page<Post> postList = postsRepository.findAllByTitleContainingOrContentContaining(keyword, keyword, pageable);

        // postList에 담겨있는 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser_id(),
                        post.getCategory(),
                        postsService.findAddrByPost(post.getId()),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }

    // 카테고리
    public Page<PagingDto> pagingByCategory(String category, Pageable pageable) {

        Page<Post> postList = postsRepository.findByCategory(category, pageable);

        // postList에 담겨있는 각각의 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser_id(),
                        post.getCategory(),
                        postsService.findAddrByPost(post.getId()),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }


    // 지역
    public Page<PagingDto> pagingByAddr(String addr, Pageable pageable) {

        Page<Post> postList = postsRepository.findAllByAddress(addr, pageable);

        // postList에 담겨있는 각각의 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser_id(),
                        post.getCategory(),
                        addr,
                        //postsService.findAddrByPost(post.getId()),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }
}

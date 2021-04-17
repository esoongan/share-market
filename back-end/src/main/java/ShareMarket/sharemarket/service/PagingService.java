package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.posts.PostsRepository;
import ShareMarket.sharemarket.dto.PagingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PagingService {

    private final PostsRepository postsRepository;

    // 페이징으로 게시글 반환
    public Page<PagingDto> paging(Pageable pageable){

        Page<Post> postList = postsRepository.findAll(pageable);

        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser_id(),
                        post.getCreatedDate()
                ));
        return pagingDtos;
    }

    // 키워드와 Pageable을 인자로 받아서 레포지토리에서 제목, 내용안의 키워드로 검색하고 결과 게시글들을 PageDto객체로 반환
    public Page<PagingDto> pagingByKeyword(String keyword, Pageable pageable) {

        Page<Post> postList = postsRepository.findAllByTitleContainingOrContentContaining(keyword, keyword, pageable);

        // postList에 담겨있는 post들을 하나씩 dto로 바꿔서 pagingList에 담아서 이걸 리턴
        Page<PagingDto> pagingDtos = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser_id(),
                        post.getCreatedDate()
                ));

        return pagingDtos;
    }
}

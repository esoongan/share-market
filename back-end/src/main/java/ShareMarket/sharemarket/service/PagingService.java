package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.posts.PostsRepository;
import ShareMarket.sharemarket.dto.PagingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PagingService {

    private final PostsRepository postsRepository;

    public Page<PagingDto> paging(Pageable pageable){

        Page<Post> postList = postsRepository.findAll(pageable);

        Page<PagingDto> pagingList = postList.map(
                post -> new PagingDto(
                        post.getId(),
                        post.getTitle(),
                        post.getUser_id(),
                        post.getCreatedDate()
                ));
        return pagingList;
    }
}

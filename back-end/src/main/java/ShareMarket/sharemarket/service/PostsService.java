package ShareMarket.sharemarket.service;


import ShareMarket.sharemarket.domain.posts.Post;
import ShareMarket.sharemarket.domain.posts.PostsRepository;
import ShareMarket.sharemarket.domain.users.User;
import ShareMarket.sharemarket.domain.users.UserRepository;
import ShareMarket.sharemarket.dto.*;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor // Repository를 주입하기 위해 사용
@Service
public class PostsService {

    private final PostsRepository postsRepository;
    private final UserRepository userRepository;


    // 게시글 저장
    @Transactional
    public Post save(PostsRequestDto postsRequestDto){
        //JpaRepository에 정의된 메소드save() -> DB에 INSERT와 UPDATE를 담당한다. (자동생성)
        //매개변수로는 ""Entity""를 전달함
        return postsRepository.save(postsRequestDto.toEntity()); // Post Entity객체
    }

    // 게시글 수정
    @Transactional
    public Post update(Long id, PostsRequestDto postsRequestDto) {
        // id로 디비에서 게시글을 찾고
        Post post = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        // 전달받은 게시글로 업데이트
        post.update(postsRequestDto);
        return post; // 엔티티객체 바로 리턴하면 안되서 추후에 수정해야함.
    }

    // 게시글 삭제
    @Transactional
    public void delete (Long id) {
        Post post = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다. id=" + id));

        postsRepository.delete(post);
    }

    // 게시글 1개 조회 by게시글PK
    @Transactional(readOnly = true)
    public PostsResponseDto findById(Long id) {
        // JpaRepository에서 제공하는 findById를 이용해서 클라이언트가 보낸 id로 Post Entity를 얻은후 ResponseDto를 리턴
        Post post = postsRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
        return new PostsResponseDto(post, findAddrByPost(id)); // 바로 entity를 응답하지 않고 Dto객체로 한번 감싸서 리턴
    }

    /*
    내가 나중에 보고 다시 기억하기 위하여 쓰는 주석
    처음에 이부분을 ResponseDto에서 작성했는데 그렇게하니까 UserRepository가 주입되지않아서 NullPointerExcetption이 났다.
    그래서 해당 로직을 이곳 PostService로 이동시키고, 여기서 지역을 찾은후에 생성자 매개변수로 전달해서 ResponseDto객체를 생성했다.
    */
    // 게시글 pk를 받아서 이를통해 해당 글을 작성한 유저의 지역을 알아내는 메서드 -> findById메소드에서 이 함수를 호출하고 리턴값을 ResponseDto생성자에 전달함으로 객체를 초기화한다.
    public String findAddrByPost(Long id) {
        // 클라이언트로 전달받은 게시글PK로 게시글 entity를 얻음
        Post post = postsRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
        // 게시글entity로부터 게시글 작성자 (User_id-pk아님)를 찾고, Optional<User>타입의 findByUsername을 이용해서 userDetails타입말고 User타입으로 엔티티를 얻는다.
        // UserDetails로 받으면 email, addr 필드값의 getter함수 사용불가능
        User user = userRepository.findByUsername(post.getUser_id())
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 없습니다."));
        // User Entity를 바로 사용하기는 위험하느로 userResponseDto객체를 생성한다.
        UserResponseDto userResponseDto = new UserResponseDto(user);

        // 작성자의 지역을 리턴한다.
        return userResponseDto.getAddr();
    }

}

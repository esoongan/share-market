package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoomRepository;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomDto;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomResponseDto;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final ChatRoomRepository roomRepository;
    private final PostRepository postRepository;
    private final UserService userService;



    public ChatRoomResponseDto makeRoom(Long id, Authentication authentication) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
        User user1 = userService.getUserByToken(authentication.getPrincipal());
        User user2 = post.getUser();


        ChatRoom room = roomRepository.save(ChatRoomDto.builder()
                .post(post)
                .user1(user1)
                .user2(user2)
                .build().toEntity());

        return new ChatRoomResponseDto(room);





    }
}

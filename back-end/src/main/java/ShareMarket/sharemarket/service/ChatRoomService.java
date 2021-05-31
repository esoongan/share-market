package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.chat.Chat;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoomRepository;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomDto;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomResponseDto;
import ShareMarket.sharemarket.exception.ChatRoomExistException;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final ChatRoomRepository roomRepository;
    private final PostRepository postRepository;
    private final UserService userService;



    @Transactional
    public ChatRoomResponseDto makeRoom(Long id, Authentication authentication) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
        User user1 = userService.getUserByToken(authentication.getPrincipal());
        User user2 = post.getUser();

        // null이면 새로 생성, null이 아니면 이미존재
        Optional<ChatRoom> chatRoomOptional = roomRepository.findByUser1AndUser2(user1, user2);

        // 이미 존재하는 경우
        if (chatRoomOptional.isPresent()) {
            throw new ChatRoomExistException(chatRoomOptional.get().getId());
        }

        ChatRoom room = roomRepository.save(ChatRoomDto.builder()
                .post(post)
                .user1(user1)
                .user2(user2)
                .build().toEntity());
        return new ChatRoomResponseDto(room);
    }

}

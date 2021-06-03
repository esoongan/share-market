package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.chat.Chat;
import ShareMarket.sharemarket.domain.chat.ChatRepository;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoomRepository;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.chat.ChatDto;
import ShareMarket.sharemarket.dto.chat.ChatRequestDto;
import ShareMarket.sharemarket.dto.chat.ChatResponseDto;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@AllArgsConstructor
@Service
public class ChatService {

    private final UserService userService;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository roomRepository;

    @Transactional
    public ChatResponseDto saveChat(ChatRequestDto requestDto, Authentication authentication) {

        ChatRoom room = roomRepository.findById(requestDto.getRoomId())
                .orElseThrow(() -> new NoSuchElementException());

        User user = userService.getUserByToken(authentication.getPrincipal());

        ChatDto chatDto = ChatDto.builder()
                .room(room)
                .sender(user)
                .message(requestDto.getMessage())
                .build();

        Chat chat = chatRepository.save(chatDto.toEntity());

        return new ChatResponseDto(chat);

    }
}

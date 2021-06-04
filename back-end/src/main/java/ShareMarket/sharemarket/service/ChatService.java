package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.chat.Chat;
import ShareMarket.sharemarket.domain.chat.ChatRepository;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoomRepository;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.chat.ChatDto;
import ShareMarket.sharemarket.dto.chat.ChatRequestDto;
import ShareMarket.sharemarket.dto.chat.ChatResponseDto;
import ShareMarket.sharemarket.exception.DefaultException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

        // 어떤 채팅방인지 찾고
        ChatRoom room = roomRepository.findById(requestDto.getRoomId())
                .orElseThrow(() -> new NoSuchElementException());

        // 토큰으로부터 보낸이를 찾는다.
        User user = userService.getUserByToken(authentication.getPrincipal());

        // requestDto -> ChatDto -> Entity and save
        ChatDto chatDto = ChatDto.builder()
                .room(room)
                .sender(user)
                .message(requestDto.getMessage())
                .build();

        Chat chat = chatRepository.save(chatDto.toEntity());

        return new ChatResponseDto(chat);
    }

    @Transactional
    public Page<ChatResponseDto> getAllChatFromRoom(Long id, Pageable pageable) {
        ChatRoom room = roomRepository.findById(id)
                .orElseThrow(() -> new DefaultException("없는 채팅방입니다" + id.toString()));
        Page<Chat> chats = chatRepository.findAllByRoom(room, pageable);

        return chats.map(
                //chat -> new ChatResponseDto(chat) 를 람다로 고친게 아래
                ChatResponseDto::new
        );
    }
}

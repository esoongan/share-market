package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.chat.Chat;
import ShareMarket.sharemarket.domain.chat.ChatRepository;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoomRepository;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.domain.user.UserRepository;
import ShareMarket.sharemarket.dto.chat.ChatDto;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomDto;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomRequestDto;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomResponseDto;
import ShareMarket.sharemarket.exception.ChatRoomExistException;
import ShareMarket.sharemarket.exception.DefaultException;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final ChatRoomRepository roomRepository;
    private final PostRepository postRepository;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    private Sort sortById() {
        return Sort.by(Sort.Direction.DESC, "id");
    }

    // 채팅방 생성
    @Transactional
    public ChatRoomResponseDto makeRoom(ChatRoomRequestDto requestDto) {
        Post post = postRepository.findById(requestDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException(requestDto.getPostId()));
        User seller = userRepository.findByUsername(requestDto.getSeller())
                .orElseThrow(() -> new UsernameNotFoundException("no username"));
        User buyer = userRepository.findByUsername(requestDto.getBuyer())
                .orElseThrow(() -> new UsernameNotFoundException("no username"));

        // null이면 새로 생성, null이 아니면 이미존재
        Optional<ChatRoom> chatRoomOptional = roomRepository.findByPostAndBuyerAndSeller(post, buyer, seller);

        // 이미 존재하는 경우
        if (chatRoomOptional.isPresent()) {
            Chat chat = chatRepository.findTopByRoom(chatRoomOptional.get(), sortById())
                    .orElseThrow(() -> new NoSuchElementException());
            throw new ChatRoomExistException(new ChatRoomResponseDto(chatRoomOptional.get(), chat.getMessage()));
        }

        ChatRoom room = roomRepository.save(ChatRoomDto.builder()
                .post(post)
                .seller(seller)
                .buyer(buyer)
                .build().toEntity());

        // 처음 생성하는 경우 메세지는 없으니까 응답에는 null로 리턴
        return new ChatRoomResponseDto(room, null);
    }

    // 채팅방 목록 조회 ( 메세지 필드 추가 )
    @Transactional
    public Page<ChatRoomResponseDto> getRoom(String ver, Authentication authentication, Pageable pageable) {
        User user = userService.getUserByToken(authentication.getPrincipal());

        // 구매자버전
        if (ver.equals("buyer")) {
            // 내가 구매자로 참여한 모든 채팅방 목록
            Page<ChatRoom> chatRooms = roomRepository.findAllByBuyer(user, pageable);

            // 엔티티 to ResponseDto(마지막메세지 필드 추가해서)
            return chatRooms.map(
                    chatRoom -> new ChatRoomResponseDto(
                            chatRoom,
                            chatRepository.findTopByRoom(chatRoom, sortById())
                                    .orElse(new ChatDto().toEntity()).getMessage()));

        } else if (ver.equals("seller")) {
            // 판매자버전
            Page<ChatRoom> chatRooms = roomRepository.findAllBySeller(user, pageable);

            return chatRooms.map(
                    chatRoom -> new ChatRoomResponseDto(
                            chatRoom,
                            chatRepository.findTopByRoom(chatRoom, sortById())
                                    .orElse(new ChatDto().toEntity()).getMessage()));
        }else{
            throw new DefaultException("Wrong Request Param");
        }

    }



}

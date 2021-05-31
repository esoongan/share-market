package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.config.security.JwtTokenProvider;
import ShareMarket.sharemarket.config.security.WebSecurityConfig;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoom;
import ShareMarket.sharemarket.domain.chatRoom.ChatRoomRepository;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.user.MemberType;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.domain.user.UserRepository;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomDto;
import ShareMarket.sharemarket.dto.chatRoom.ChatRoomResponseDto;
import ShareMarket.sharemarket.dto.user.UserRequestDto;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.ChatRoomService;
import ShareMarket.sharemarket.service.UserService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@WebMvcTest
public class ChatControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private WebSecurityConfig webSecurityConfig;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ChatRoomRepository roomRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;


    @Before
    public void setUp() throws Exception {
        postRepository.deleteAll();
        userRepository.deleteAll();
        roomRepository.deleteAll();
    }

    @Test
    public void ChatRoom_새로생성됨() throws Exception {
        //given
        User user1 = User.builder()
                .username("seungjin")
                .password("1234")
                .addr("관악구")
                .email("seungjin97@naver.com")
                .roles(Collections.singletonList(MemberType.USER))
                .build();

        userRepository.save(user1);

        User user2 = User.builder()
                .username("hayeong")
                .password("1234")
                .email("hy@gmail.com")
                .addr("광진구")
                .roles(Collections.singletonList(MemberType.USER))
                .build();

        userRepository.save(user2);

        Post post1 = Post.builder()
                .title("첫번째 게시글")
                .content("첫번째 게시글내용")
                .user(user1) // seungjin이 작성한 글
                .category("스포츠")
                .price(10)
                .deposit(10)
                .build();

        postRepository.save(post1);


        // 채팅방 이미 만들어져 있는 상태
        ChatRoomDto roomDto = new ChatRoomDto(post1, user1, user2);
        ChatRoom room = roomRepository.save(roomDto.toEntity());

        assertThat(room.getId()).isEqualTo(1);

    }
//    @Test
//    @WithUserDetails("hayeong")
//    public void 예외가_발생한다() throws Exception {
//        //when
//        Map<String, Long> map = new HashMap<>();
//        mvc.perform(MockMvcRequestBuilders
//                .post("/uauth/api/chatroom")
//                .content(String.valueOf(map.put("postId", (long) 1)))
//                .contentType("application/json"))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.stautsCode").value(HttpStatusCode.BAD_REQUEST))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.httpResponseMessage").value(HttpResponseMessage.ROOM_ALREADY_EXIST));
//
//    }


    @After
    public void tearDown() throws Exception {

    }
}
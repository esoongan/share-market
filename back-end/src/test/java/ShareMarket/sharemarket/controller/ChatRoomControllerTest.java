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
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ChatRoomControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ChatRoomRepository roomRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    private AbstractControllerTest abstractControllerTest = new AbstractControllerTest();


    @Before
    public void setUp() throws Exception {
        postRepository.deleteAll();
        userRepository.deleteAll();
        roomRepository.deleteAll();
    }

    @Test
    public void 채팅방_중복생성하려할때_예외발생() throws Exception {
        //given
        User user1 = User.builder()
                .username("seungjin")
                .password(passwordEncoder.encode("1234"))
                .addr("관악구")
                .email("seungjin97@naver.com")
                .roles(Collections.singletonList(MemberType.USER))
                .build();

        userRepository.save(user1);

        User user2 = User.builder()
                .username("hayoung")
                .password(passwordEncoder.encode("1234"))
                .email("hy@gmail.com")
                .addr("광진구")
                .roles(Collections.singletonList(MemberType.USER))
                .build();

        userRepository.save(user2);
        System.out.println("비밀번호:"+user2.getPassword());

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
        ChatRoomDto roomDto = new ChatRoomDto(post1, user2, user1);
        ChatRoom room = roomRepository.save(roomDto.toEntity());
        System.out.println("생성된 채팅방 아이디:"+room.getId());

        UserRequestDto requestDto = new UserRequestDto("hayoung", "1234");
        String token = userService.login(requestDto);

        assertThat(room.getId()).isEqualTo(1);

        //when
        Map<String, Long> map = new HashMap<>();
        map.put("postId", (long) 1);
        mvc.perform(MockMvcRequestBuilders
                .post("/uauth/api/chatroom")
                .header("X-AUTH-TOKEN", token)
                .content(AbstractControllerTest.asJsonString(map))
                .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.statusCode").value(HttpStatusCode.BAD_REQUEST))
                .andExpect(MockMvcResultMatchers.jsonPath("$.httpResponseMessage").value(HttpResponseMessage.ROOM_ALREADY_EXIST+" : "+room.getId()));

    }
//
//    @After
//    public void tearDown() throws Exception {
//
//    }
}
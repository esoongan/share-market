package ShareMarket.sharemarket.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest
public class HomeControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void home이_리턴됨() throws Exception {
        String home = "home";

        // perform() - 요청을 전송하는 역할, 결과로 ResultActions객체를 받고, 이 객체에서 리턴값을 검증하고 확인할 수 있는 andExcpect()메소드를 제공함.
        mvc.perform(get("/"))
                //상태코드 -> isOk()는 상태코드 200
                .andExpect(status().isOk())
                // 응답본문의 내용을 검증함 -> Controller에서 'home'을 리턴하기 때문에 이값이 맞는지 검증한다.
                .andExpect(content().string(home));
    }

    @Test
    public void helloDto가_리턴됨() throws Exception {
        String name = "hello";
        int amount = 1000;

        mvc.perform(
                get("/dto")
                        // param -> api테스트할때 사용될 요청 파라미터를 설정한다. (단 값은 string만 허용되므로 숫자나 날짜는 문자열로 변공후 사용)
                        .param("name", name)
                        .param("amount", String.valueOf(amount)))
                .andExpect(status().isOk())
                //jsonPath -> JSON응답값을 필드별로 검증할 수 있는 메소드
                // $를 기준으로 필드명을 명시한다.
                .andExpect(jsonPath("$.name", is(name)))
                .andExpect(jsonPath("$.amount", is(amount)));
    }
}
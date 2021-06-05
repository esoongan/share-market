package ShareMarket.sharemarket.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

public class AbstractControllerTest {

    public static String asJsonString(Map<String, Long> object) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(object);
        } catch(Exception e) {
            throw new RuntimeException(e);
        }
    }
}

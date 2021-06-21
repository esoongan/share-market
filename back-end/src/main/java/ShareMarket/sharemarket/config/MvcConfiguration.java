package ShareMarket.sharemarket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

    //파일 업로드 처리를 위한 빈 추가
    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();

        multipartResolver.setDefaultEncoding("UTF-8");
        multipartResolver.setMaxUploadSize(20 * 1024 * 1024);

        return multipartResolver;
    }

    // ip:port/images/~로 접근했을때 바로 클래스패스의 images폴더로 접근하하기위해
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**") // /images로 접근시
                .addResourceLocations("classpath:/images/") // resources/images/로 매핑
                .setCachePeriod(20);
    }

    // cors 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("*");
    }
}

package ShareMarket.sharemarket;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// 메인클래스 -> 위 어노테이션으로 인해 스프링부트의 자동설정, 스프링빈 일긱와 생성을 모두 자동으로 설정함
// @SpringBootApplication이 있는 위치부터 설정을 읽으므로 이 클래스는 항상 프로젝트 최상단에 위치해야함

@EnableJpaAuditing
@SpringBootApplication
public class ShareMarketApplication {

	public static void main(String[] args) {
		// 메인메소드에서 실행하는 SpringApllication.run으로 인해 내장 WAS(톰캣)이 실행됨!
		SpringApplication.run(ShareMarketApplication.class, args);
	}

}

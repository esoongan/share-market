package ShareMarket.sharemarket.domain.posts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

// 리포지토리 - 데이터베이스에 접근하는 영역 ( 구 개발방식에서 dao의 역할)
public interface PostsRepository extends JpaRepository<Posts, Long> {

    @Query("SELECT p FROM Posts p ORDER BY p.id DESC")
    List<Posts> findAllDesc();
}

/*
단순히 인터페이스를 생성후, JpaRepository<Entity클래스, PK타입>을 상속하면 기본적인 CRUD메소드가 자동으로 생성됨
Entity클래스와 딸려있는 Repository는 함께 움직여야 하므로 도메인 패키지에서 함게 관리해야함
 */

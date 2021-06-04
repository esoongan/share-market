package ShareMarket.sharemarket.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


/* 스프링 데이터 JPA는 메소드 이름을 스프링데이터JPA의 규칙에 맞게 지어주면 해당 엔티티에 맞게 데이터를 조회/조작하는 코드를
자동으로 생성해준다.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByUsername(String username);
    Optional<User> findByUsername(String username); // username을 인자로 받아 해당하는 User를 반환함.

}

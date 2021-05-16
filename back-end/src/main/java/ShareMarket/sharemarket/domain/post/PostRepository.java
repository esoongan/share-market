package ShareMarket.sharemarket.domain.post;

import ShareMarket.sharemarket.domain.contract.Contract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

// 리포지토리 - 데이터베이스에 접근하는 영역 ( 구 개발방식에서 dao의 역할)
// 제네릭타입에는 Entity클래스와 PK의 타입을 명시하면됨
public interface PostRepository extends JpaRepository<Post, Long>, JpaSpecificationExecutor<Post> {


    // 레포지토리 함수에 실제 실행될 쿼리를 매핑할 수 있음
    // 페이징 관련 쿼리는 페이징할 총 개시물갯수와 실제값 2개를 전부 가져와야 하므로 2가지에 해당하는 쿼리를 적어줌
    @Query(
            value = "SELECT p FROM Post p WHERE p.title LIKE %:keyword% OR p.content LIKE %:keyword%",
            countQuery = "SELECT COUNT(p.id) FROM Post p WHERE p.title LIKE %:keyword% OR p.content LIKE %:keyword%"
    )
    Page<Post> findAllSearch(@Param("keyword") String keyword, Pageable pageable);

    // 1. 제목이나 내용에 해당 키워드가 들어있는 Post검색
    /*JpaRepository에서 메서드명의 By이후는 SQL의 where조건절에 대응되므로 Containing읇 붙여주면 Like검색이됨 = %{keyword}%
    Title한테 주는 keyword랑 Content한테 주는 Keyword 2개 줘야함*/
    Page<Post> findAllByTitleContainingOrContentContaining(String keyword_T, String keyword_C, Pageable pageable);

    /*
    위에 2개함수는 똑같은 기능을 수행함
    1. 쿼리를 직접매핑하는거
    2. JPA문법에 따라서 해본것!! 둘다 똑같이 작동하는것을 확인함
    3. 쿼리메소드의 입력변수로 Pageable변수를 추가하면 Page타입을 반환형으로 사용할 수 있다.
     */

    // 2. 카테고리로 검색
    Page<Post> findByCategory(String category, Pageable pageable);

    // 3. 지역으로 검색
//    @Query(
//            value = "SELECT p FROM Post p, User u WHERE p.user_id=u.username AND u.addr=:address",
//            countQuery = "SELECT COUNT(p.id) FROM Post p, User u WHERE p.user_id=u.username AND u.addr=:address"
//    )
//    Page<Post> findAllByAddress(@Param("address") String address, Pageable pageable);

    //4. 키워드+카테고리
    //5. 키워드+지역
    //6. 카테고리+지역
    //7. 키워드+카테고리+지역

    // 구현한 Specificaion객체를 파라미터에 넣어주기만 하면 해당조건에 부합되는 객체를 조회할수 있따.
    @Override
    Page<Post> findAll(Specification<Post> spec, Pageable pageable);

}

/*
단순히 인터페이스를 생성후, JpaRepository<Entity클래스, PK타입>을 상속하면 기본적인 CRUD메소드가 자동으로 생성됨
Entity클래스와 딸려있는 Repository는 함께 움직여야 하므로 도메인 패키지에서 함게 관리해야함
 */

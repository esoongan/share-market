package ShareMarket.sharemarket.domain.File;

import ShareMarket.sharemarket.dto.FileDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {

    // File엔티티에 이미 post_id가 들어가있고, post_id이외에는 따로 post에서 필요한 내용이 없으므로 굳이 조인하지 않아도
    @Query("select f from File f where f.post_id=:id")
    // 기본적으로 인터페이스는 매개변수이름정보를 보유하지 않는다. java8에는 명시적으로 @Param을 이용해 설정해주어야 한다 아님오류남.
    List<File> findAllByPost_id(@Param("id") Long id);
}


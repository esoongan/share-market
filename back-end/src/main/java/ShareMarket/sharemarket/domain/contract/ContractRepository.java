package ShareMarket.sharemarket.domain.contract;

import ShareMarket.sharemarket.domain.post.Post;
import org.apache.tomcat.jni.Local;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, Long>, JpaSpecificationExecutor<Contract> {

    List<Contract> findAllByPost(Post post);

    List<Contract> findAllBySellerIdAndState(Long sellerId, String state);

    List<Contract> findAllByBuyerIdAndState(Long buyerId, String state);

    //1번조건 : 시작시간이 start, end사이이거나
    List<Contract> findAllByStartDateBetween(LocalDate startDate, LocalDate endDate);

    //2번조건 : 시작시간이 start이하이면서, 종료시간이 start이상인것
    List<Contract> findAllByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate startDate1, LocalDate startDate2);

    // Specification적용


    @Override
    List<Contract> findAll(Specification<Contract> spec);
}

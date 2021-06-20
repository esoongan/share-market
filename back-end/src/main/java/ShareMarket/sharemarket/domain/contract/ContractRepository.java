package ShareMarket.sharemarket.domain.contract;

import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.user.User;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long>, JpaSpecificationExecutor<Contract> {

    List<Contract> findAllByPost(Post post);

    List<Contract> findAllBySellerAndState(User seller, String state);
    //List<Contract> findAllBySellerIdAndState(Long sellerId, String state);

    List<Contract> findAllByBuyerAndState(User buyer, String state);

    List<Contract> findAllBySeller(User seller);

    List<Contract> findAllByBuyer(User buyer);

    //1번조건 : 시작시간이 start, end사이이거나
    List<Contract> findAllByStartDateBetween(LocalDate startDate, LocalDate endDate);

    //2번조건 : 시작시간이 start이하이면서, 종료시간이 start이상인것
    List<Contract> findAllByStartDateLessThanEqualAndEndDateGreaterThanEqual(LocalDate startDate1, LocalDate startDate2);

    // Specification적용


    @Override
    List<Contract> findAll(Specification<Contract> spec);
}

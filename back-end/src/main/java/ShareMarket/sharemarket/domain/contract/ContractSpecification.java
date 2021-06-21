package ShareMarket.sharemarket.domain.contract;

import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.time.LocalDate;

public class ContractSpecification {

    //1번조건 : 시작시간이 start, end사이이거나
    public static Specification<Contract> betweenStartDate(LocalDate startDate, LocalDate endDate) {
        return new Specification<Contract>() {
            @Override
            public Predicate toPredicate(Root<Contract> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                return cb.between(root.get("startDate"), startDate, endDate);
            }
        };
    }

    //2-1번조건  : 시작시간이 start이하이면서
    public static Specification<Contract> lessThanStartDate(LocalDate startDate) {
        return new Specification<Contract>() {
            @Override
            public Predicate toPredicate(Root<Contract> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                return cb.lessThanOrEqualTo(root.get("startDate"), startDate);
            }
        };
    }

    //2-2번조건  : 종료시간이 start이상인것
    public static Specification<Contract> greaterThanEndDate(LocalDate startDate) {
        return new Specification<Contract>() {
            @Override
            public Predicate toPredicate(Root<Contract> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                return cb.greaterThanOrEqualTo(root.get("endDate"), startDate);
            }
        };
    }

    //3번조건 : 특정 state인 상태인 거래를 찾는다.
    public static Specification<Contract> equalSate(String state) {
        return new Specification<Contract>() {
            @Override
            public Predicate toPredicate(Root<Contract> root, CriteriaQuery<?> query, CriteriaBuilder cb) {

                return cb.equal(root.get("state"), state);
            }
        };
    }

}

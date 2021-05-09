package ShareMarket.sharemarket.domain.contract;

import ShareMarket.sharemarket.domain.post.Post;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.time.LocalDate;
import java.util.Date;

public class ContractSpecification {

    // 인자로 주어진 시작시간보다 크거나 같은것을 찾는 spec
    public static Specification<Post> beforeStartDate(Date startDate) {
        return new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Join<Contract, Post> postContractJoin = root.join("post", JoinType.INNER);

                return cb.greaterThanOrEqualTo(root.get("startDate").as(Date.class), startDate);
            }
        };
    }

    // 인자로 주어진 종료시간보다 작거나 같은것을 찾는 spec
    public static Specification<Post> afterEndDate(LocalDate endDate) {
        return new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Join<Post, Contract> postContractJoin = root.join("post", JoinType.INNER);

                return cb.lessThanOrEqualTo(root.get("endDate"), endDate);
            }
        };
    }
}

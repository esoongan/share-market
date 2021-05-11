package ShareMarket.sharemarket.domain.post;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.domain.user.User;
import org.hibernate.engine.transaction.jta.platform.internal.JOnASJtaPlatform;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.time.LocalDate;
import java.util.Date;

// Specification 인터페이스를 사용하는 helper class
// 검색 조건을 모아놓은 클래스 만들기 (Jpa의 Criteria API를 사용하게 됨) : 체
// Specification : 검색조건을 추상화한 객체
public class PostSpecification {

    //작성자
    public static Specification<Post> equalWriter(final User user) {
        return new Specification<Post>() {
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.equal(root.get("user"), user);
            }
        };
    }


    //제목에 키워드
    public static Specification<Post> likeTitle(final String searchKey) {
        return new Specification<Post>() {
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                return cb.like(root.get("title"), "%" + searchKey + "%");
            }
        };
    }

    // 내용에 키워드
    public static Specification<Post> likeContent(final String searchKey) {
        return (Specification<Post>) ((root, query, builder) ->
                builder.like(root.get("content"), "%" + searchKey + "%"));
    }

    //카테고리
    public static Specification<Post> equalCategory(String category) {
        return (Specification<Post>) (root, query, cb) -> cb.equal(root.get("category"), category);
    }

    //지역 -조인필요
    public static Specification<Post> equalAddr(String addr) {
        return new Specification<Post>() {
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                //얘를 위해서 jpa연관관게를 가지는 조인컬럼을 지정
                Join<Post, User> postUserJoin = root.join("user", JoinType.INNER);

                return cb.equal(postUserJoin.get("addr"), addr);

            }
        };
    }

    // 인자로 주어진 시작시간보다 크거나 같은것을 찾는 spec
    public static Specification<Post> beforeStartDate(Date startDate) {
        return new Specification<Post>() {
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Join<Contract, Post> postContractJoin = root.join("post", JoinType.INNER);

                return cb.greaterThanOrEqualTo(postContractJoin.get("startDate").as(Date.class), startDate);
            }
        };
    }

    // 인자로 주어진 종료시간보다 작거나 같은것을 찾는 spec
    public static Specification<Post> afterEndDate(LocalDate endDate) {
        return new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                Join<Post, Contract> postContractJoin = root.join("post", JoinType.INNER);

                return cb.lessThanOrEqualTo(postContractJoin.get("endDate"), endDate);
            }
        };
    }
}

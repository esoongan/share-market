package ShareMarket.sharemarket.domain.post;

import ShareMarket.sharemarket.domain.user.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;

// Specification 인터페이스를 사용하는 helper class
// 검색 조건을 모아놓은 클래스 만들기 (Jpa의 Criteria API를 사용하게 됨)
public class PostSpecification {


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
                Join<Post, User> postUserJoin = root.join("user_id", JoinType.INNER);

                return cb.equal(postUserJoin.get("addr"), addr);

            }
        };
    }
}

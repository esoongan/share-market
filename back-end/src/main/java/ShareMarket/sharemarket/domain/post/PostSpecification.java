package ShareMarket.sharemarket.domain.post;

import ShareMarket.sharemarket.domain.user.User;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.List;

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
        return (Specification<Post>) ((root, query, cb) ->
                cb.like(root.get("content"), "%" + searchKey + "%"));
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
                return cb.like(postUserJoin.get("addr"), "%" + addr + "%");

            }
        };
    }

    // 게시글 번호가 담긴 리스트를 받아서 해당 리스트에 있는 게시글을 제외한것들을 찾는 spec
    public static Specification<Post> notEqualPostId(List<Long> postId) {
        return new Specification<Post>() {
            @Override
            public Predicate toPredicate(Root<Post> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                // not in을 구현하는 방법, value에 collection을 줘도 되는구나
                return cb.in(root.get("id")).value(postId).not();
            }
        };
    }
}

    //====================================================================================





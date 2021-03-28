package ShareMarket.sharemarket.domain;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 얘는 테이블로 매핑하지 않고 자식클래스(엔티티)에게 매핑정보를 상속하기위한 어노테이션
@EntityListeners(AuditingEntityListener.class) // JPA에게 해당 Entity는 Auditing기능을 사용한다는것을 알리는 어노테이션
// 데이터 조작시 자동으로 날짜를 수정해주는 JPA의 Auditing기능을 사용한다.
public abstract class BaseTimeEntity {

    @CreatedDate // Entity가 처음 저장될때 생성일을 주입하는 어노테이션
    @Column(updatable = false) //생성일은 update가 필요없으니까
    private LocalDateTime createdDate;

    @LastModifiedDate // Entity가 수정될때 수정일자를 주입하는 어노테이션
    private LocalDateTime modifiedDate;

}
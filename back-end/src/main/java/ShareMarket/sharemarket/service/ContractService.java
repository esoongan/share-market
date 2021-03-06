package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.domain.contract.ContractRepository;
import ShareMarket.sharemarket.domain.contract.ContractSpecification;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import ShareMarket.sharemarket.dto.contract.ContractResponseDto;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
@Service
public class ContractService {

    private final ContractRepository contractRepository;
    private final PostRepository postRepository;
    private final UserService userService;

    // 거래요청 - state:default
    @Transactional
    public ContractResponseDto request(ContractRequestDto contractRequestDto, Authentication authentication) {
//        contractRequestDto.setSellerId(getUserPkByPostId(contractRequestDto.getPost().getId()));
        // JPA연관관계 후 : getPost -> getUser -> getId (getUserPKByPostID함수 사용할필요 없음)
        Post post = postRepository.findById(contractRequestDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException(contractRequestDto.getPostId()));
        contractRequestDto.setPost(post);
        // 아직은 jpa join관계를 가지지않는 구조지만 USER를 테이블에서 가지도록 쉽게 변경 가능함
        contractRequestDto.setSeller(contractRequestDto.getPost().getUser());
        contractRequestDto.setBuyer(userService.getUserByToken(authentication.getPrincipal()));
        contractRequestDto.setState("default");
        // DB에 저장
        Contract contract = contractRepository.save(contractRequestDto.toEntity());
        log.info("Contract DB insert complete");
        // ResoponseDto로 반환
        return new ContractResponseDto(contract);
    }

    // update -> state:accept
    @Transactional
    public ContractResponseDto update(Long id) {
        // contract PK로 contract찾고
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 거래가 없습니다. id=" + id));
        //update함수 호출 --> 상태만 accept로 바꾸는 업데이트
        contract.update("accept");
        return new ContractResponseDto(contract);
    }

    // delete -> 거절
    @Transactional
    public void delete(Long id) {
        contractRepository.deleteById(id);
    }


    // 거래조회 판매자ver
    @Transactional
    public List<ContractResponseDto> findContractSeller(String state, Authentication authentication) {
        User seller = userService.getUserByToken(authentication.getPrincipal());
        List<Contract> contractList = contractRepository.findAllBySellerAndState(seller, state);

        List<ContractResponseDto> responseDtoList = new ArrayList<>();
        for(Contract contract: contractList){
            ContractResponseDto responseDto = new ContractResponseDto(contract);
            responseDtoList.add(responseDto);
        }
        return responseDtoList;

    }

    //거래조회 : 구매자
    @Transactional
    public List<ContractResponseDto> findContractBuyer(String state, Authentication authentication) {
        User buyer = userService.getUserByToken(authentication.getPrincipal());
        List<Contract> contractList = contractRepository.findAllByBuyerAndState(buyer, state);

        List<ContractResponseDto> responseDtoList = new ArrayList<>();
        for(Contract contract: contractList){
            ContractResponseDto responseDto = new ContractResponseDto(contract);
            responseDtoList.add(responseDto);
        }
        return responseDtoList;

    }

    // spec을 통해 주어진 기간안에 accept인 거래를 모두 찾고 distinct postId를 찾는 함수 --> 이 게시글들을 제외한 모든 게시글들을 보여주면 끝
    public List<Long> findPostIdtoExclude(LocalDate startDate, LocalDate endDate) {
        // 만들어놓은 조건으로 스펙을 먼저 만들고
        // 1번조건
        Specification<Contract> spec = ContractSpecification.betweenStartDate(startDate, endDate);
        // 1번조건이거나 2-1and2-2 -> 1번조건이거나 2번조건
        spec = spec.or(ContractSpecification.lessThanStartDate(startDate).and(ContractSpecification.greaterThanEndDate(startDate)));
        // 3번조건
        spec = spec.and(ContractSpecification.equalSate("accept"));

        List<Contract> contractList = contractRepository.findAll(spec);

        // distinct postid를 위한 집합
        Set<Long> postIdSet = new HashSet<>();

        for (Contract contract : contractList) {
            postIdSet.add(contract.getPost().getId());
        }

        // Set -> List (생성자로 set전달)
        return new ArrayList<>(postIdSet);
    }




}

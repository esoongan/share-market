package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.domain.contract.ContractRepository;
import ShareMarket.sharemarket.domain.contract.ContractSpecification;
import ShareMarket.sharemarket.domain.file.FileRepository;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.domain.user.User;
import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import ShareMarket.sharemarket.dto.contract.ContractResponseDto;
import ShareMarket.sharemarket.dto.file.FileResponseDto;
import ShareMarket.sharemarket.dto.mail.MailDto;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.Builder;
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
    private final FileRepository fileRepository;
    private final UserService userService;
    private final MailService mailService;

    // 거래요청 - state:default
    @Transactional
    public Long request(ContractRequestDto contractRequestDto, Authentication authentication) {
//        contractRequestDto.setSellerId(getUserPkByPostId(contractRequestDto.getPost().getId()));
        // JPA연관관계 후 : getPost -> getUser -> getId (getUserPKByPostID함수 사용할필요 없음)

        Post post = postRepository.findById(contractRequestDto.getPostId())
                .orElseThrow(() -> new PostNotFoundException(contractRequestDto.getPostId()));
        contractRequestDto.setPost(post);

        User seller = contractRequestDto.getPost().getUser();
        User buyer = userService.getUserByToken(authentication.getPrincipal());

        contractRequestDto.setSeller(seller);
        contractRequestDto.setBuyer(buyer);
        contractRequestDto.setState("default");

        // DB에 저장
        Contract contract = contractRepository.save(contractRequestDto.toEntity());
        log.info("Contract DB insert complete");


        MailDto mailDto = new MailDto(contractRequestDto);
        mailService.sendMail(mailDto);

        return contract.getId();
    }


    // 거래수락 또는 거절 : change state to accept or refused
    @Transactional
    public void update(Long id, String state) {
        // contract PK로 contract찾고
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 거래가 없습니다. id=" + id));
        //update함수 호출 --> 상태만 accept로 바꾸는 업데이트
        contract.update(state);
        // 거래수락일경우, 겹치는 기간의 거래중 default인것들은 refused로 바꾸기
        if (state.equals("accept")) {
            // 겹치는 기간의 거래중 default상태인것들을 찾는다.
            List<Contract> contractList = this.findContractToExclude(contract.getStartDate(), contract.getEndDate(), "default");
            for (Contract contract1 : contractList) {
                contract1.update("refuse");
            }
        }
    }

    // 거래 삭제
    @Transactional
    public void delete(Long id) {
        contractRepository.deleteById(id);
    }


    // 판매자인지 구매자인지에 따라 다르고 state는 상관없이 모두 응답
    @Transactional
    public List<ContractResponseDto> findContract(String ver, Authentication authentication) {
        User user = userService.getUserByToken(authentication.getPrincipal());
        List<Contract> contractList;
        if (ver.equals("buyer")) {
            contractList = contractRepository.findAllByBuyer(user);
        }else{
            contractList = contractRepository.findAllBySeller(user);
        }

        List<ContractResponseDto> responseDtoList = new ArrayList<>();
        for (Contract contract : contractList) {
            Post post = contract.getPost();
            ContractResponseDto responseDto = ContractResponseDto.builder()
                    .id(contract.getId())
                    .postId(post.getId())
                    .postTitle(post.getTitle())
                    .fileResponseDto(new FileResponseDto(fileRepository.findAllByPostId(post.getId()).get(0)))
                    .buyer(contract.getBuyer().getUsername())
                    .seller(contract.getSeller().getUsername())
                    .startDate(contract.getStartDate())
                    .endDate(contract.getEndDate())
                    .state(contract.getState())
                    .build();

            responseDtoList.add(responseDto);
        }

        return responseDtoList;
    }


    // 주어진기간안에 특정state상태인 거래를 찾는함수
    public List<Contract> findContractToExclude(LocalDate startDate, LocalDate endDate, String state) {
        // 만들어놓은 조건으로 스펙을 먼저 만들고
        // 1번조건
        Specification<Contract> spec = ContractSpecification.betweenStartDate(startDate, endDate);
        // 1번조건이거나 2-1and2-2 -> 1번조건이거나 2번조건
        spec = spec.or(ContractSpecification.lessThanStartDate(startDate).and(ContractSpecification.greaterThanEndDate(startDate)));
        // 3번조건
        spec = spec.and(ContractSpecification.equalSate(state));

        List<Contract> contractList = contractRepository.findAll(spec);

        return contractList;
    }



    // 주어진 기간안에 accept인 거래를 모두 찾고 distinct postId를 찾는 함수 --> 이 게시글들을 제외한 모든 게시글들을 보여주면됨
    public List<Long> findPostIdtoExclude(LocalDate startDate, LocalDate endDate, String state) {
        List<Contract> contractList = findContractToExclude(startDate, endDate, state);

        // distinct postid를 위한 집합
        Set<Long> postIdSet = new HashSet<>();

        for (Contract contract : contractList) {
            postIdSet.add(contract.getPost().getId());
        }

        // Set -> List (생성자로 set전달)
        return new ArrayList<>(postIdSet);
    }




}

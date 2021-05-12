package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.domain.contract.ContractRepository;
import ShareMarket.sharemarket.domain.post.Post;
import ShareMarket.sharemarket.domain.post.PostRepository;
import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import ShareMarket.sharemarket.dto.contract.ContractResponseDto;
import ShareMarket.sharemarket.exception.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        contractRequestDto.setSellerId(contractRequestDto.getPost().getUser().getId());
        contractRequestDto.setState("default");
        contractRequestDto.setBuyerId(userService.getUserByToken(authentication.getPrincipal()).getId());
        // DB에 저장
        Contract contract = contractRepository.save(contractRequestDto.toEntity());
        log.info("Contract DB insert complete");
        // ResoponseDto로 반환
        return new ContractResponseDto(contract);
    }

    // update -> state:accept
    @Transactional
    public ContractResponseDto update(Long id) {
        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 거래가 없습니다. id=" + id));
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
        Long userId = userService.getUserByToken(authentication.getPrincipal()).getId();
        List<Contract> contractList = contractRepository.findAllBySellerIdAndState(userId, state);

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
        Long userId = userService.getUserByToken(authentication.getPrincipal()).getId();
        List<Contract> contractList = contractRepository.findAllByBuyerIdAndState(userId, state);

        List<ContractResponseDto> responseDtoList = new ArrayList<>();
        for(Contract contract: contractList){
            ContractResponseDto responseDto = new ContractResponseDto(contract);
            responseDtoList.add(responseDto);
        }
        return responseDtoList;

    }

}

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
        contractRequestDto.setSellerId(getUserPkByPostId(contractRequestDto.getPostId()));
        contractRequestDto.setState("default");
        contractRequestDto.setBuyerId(userService.getUserPkByToken(authentication.getPrincipal()).getId());
        // DB에 저장
        Contract contract = contractRepository.save(contractRequestDto.toEntity());
        log.info("Contract DB insert complete");
        // ResoponseDto로 반환
        return new ContractResponseDto(contract);
    }

    // update -> state:accept
    // delete -> 거절




    public Long getUserPkByPostId(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
        return post.getUser().getId();
    }

}

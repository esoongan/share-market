package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.domain.contract.ContractRepository;
import ShareMarket.sharemarket.domain.user.UserRepository;
import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import ShareMarket.sharemarket.dto.contract.ContractResponseDto;
import ShareMarket.sharemarket.dto.user.UserResponseDto;
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
    private final UserRepository userRepository;
    private final PostService postService;
    private final UserService userService;

    @Transactional
    public ContractResponseDto request(ContractRequestDto contractRequestDto, Authentication authentication) {
        contractRequestDto.setSellerId(getUserPkByPostId(contractRequestDto.getPostId()));
        contractRequestDto.setState("default");
        contractRequestDto.setBuyerId(userService.getUserPkByToken(authentication.getPrincipal()));
        // DB에 저장
        Contract contract = contractRepository.save(contractRequestDto.toEntity());
        log.info("Contract DB insert complete");
        // ResoponseDto로 반환
        return new ContractResponseDto(contract);
    }

    // update -> state:accept
    // delete -> 거절




    // 어디로 옮겨야하는게 맞는지 모르겠다.
    public Long getUserPkByPostId(Long id) {
        UserResponseDto userResponseDto = postService.getUserDtoByPostPk(id);
        log.info("게시글 PK로 UserPK찾기"+userResponseDto.getId().toString());
        return userResponseDto.getId();
    }

}

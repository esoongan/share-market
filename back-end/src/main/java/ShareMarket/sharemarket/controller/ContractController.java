package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import ShareMarket.sharemarket.dto.contract.ContractResponseDto;
import ShareMarket.sharemarket.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;


@RequiredArgsConstructor
@RestController
public class ContractController {

    private final ContractService contractService;

    //거래요청
    @PostMapping("/uauth/api/contract")
    public ResponseEntity<ContractResponseDto> requestContract(@RequestBody ContractRequestDto contractRequestDto, Authentication authentication) throws URISyntaxException {
        ContractResponseDto contractResponseDto = contractService.request(contractRequestDto, authentication);
        URI url = new URI(String.format("/posts/$s", contractResponseDto.getId()));
        return ResponseEntity.created(url).body(contractResponseDto);
    }

    //거래수락

    //거래거절

    //거래1개조회

    //거래목록조회(판매자ver)

    //거래목록조회(구매자ver)


}

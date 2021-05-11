package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.contract.Contract;
import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import ShareMarket.sharemarket.dto.contract.ContractResponseDto;
import ShareMarket.sharemarket.dto.paging.PagingDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;


@RequiredArgsConstructor
@RestController
public class ContractController {

    private final ContractService contractService;

    //거래요청
    @PostMapping("/uauth/api/contract")
    public ResponseEntity<ContractResponseDto> requestContract(@RequestBody ContractRequestDto contractRequestDto, Authentication authentication) throws URISyntaxException {
        // requestDto에 String으로 받은 날짜값 LocalDate로 변환해서 request함수인자로 줘야함!!! -> 안해도 자동으로되네?
        ContractResponseDto contractResponseDto = contractService.request(contractRequestDto, authentication);
        URI url = new URI(String.format("/posts/$s", contractResponseDto.getId()));
        return ResponseEntity.created(url).body(contractResponseDto);
    }

    //거래수락
    @PutMapping("/uauth/api/contract/{id}")
    public ResponseEntity<ContractResponseDto> acceptContract(@PathVariable Long id) {
        ContractResponseDto responseDto = contractService.update(id);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.ACCEPT_CONTRACT,
                responseDto),HttpStatus.OK
        );
    }

    //거래거절
    @DeleteMapping("/uauth/api/contract/{id}")
    public ResponseEntity<Long> rejectContract(@PathVariable Long id) {
        contractService.delete(id);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.DELETE_CONTRACT,
                id),HttpStatus.OK
        );

    }


    //거래1개조회

    //거래목록조회(판매자ver)
    // 로그인한 유저가 판매자인 거래중, state상태에 따라서
    @GetMapping("/uauth/api/contract/seller")
    public ResponseEntity<List<ContractResponseDto>> getContractSellerVer(@RequestParam String state, Authentication authentication) {
        List<ContractResponseDto> responseDtoList = contractService.findContractSeller(state, authentication);
        if (responseDtoList.size() == 0) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity(DefaultRes.response(
                    HttpStatusCode.OK,
                    HttpResponseMessage.READ_CONTRACT,
                    responseDtoList), HttpStatus.OK);
        }
    }

    //거래목록조회(구매자ver)
    @GetMapping("/uauth/api/contract/buyer")
    public ResponseEntity<List<ContractResponseDto>> getContractBuyerVer(@RequestParam String state, Authentication authentication) {
        List<ContractResponseDto> responseDtoList = contractService.findContractBuyer(state, authentication);
        if (responseDtoList.size() == 0) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity(DefaultRes.response(
                    HttpStatusCode.OK,
                    HttpResponseMessage.READ_CONTRACT,
                    responseDtoList), HttpStatus.OK);
        }
    }


}

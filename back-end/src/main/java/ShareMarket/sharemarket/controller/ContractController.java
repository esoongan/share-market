package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.contract.ContractRequestDto;
import ShareMarket.sharemarket.dto.contract.ContractResponseDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin // 이게없어도 사실 되야되는데
@RequiredArgsConstructor
@RestController
public class ContractController {

    private final ContractService contractService;

    //거래요청
    @PostMapping("/uauth/api/contract")
    public ResponseEntity<String> requestContract(@RequestBody ContractRequestDto contractRequestDto, Authentication authentication) throws URISyntaxException {
        // requestDto에 String으로 받은 날짜값 LocalDate로 변환해서 request함수인자로 줘야함!!! -> 안해도 자동으로되네?
        Long id = contractService.request(contractRequestDto, authentication);

        URI url = new URI(String.format("/posts/$s", id));
        return ResponseEntity.created(url).body("contract request success");
    }

    //거래상태변경 - change state to accept or refused
    @PutMapping("/uauth/api/contract/{id}")
    public ResponseEntity<ContractResponseDto> changeContractState(@PathVariable Long id, @RequestParam String state) {
        contractService.update(id, state);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.CHANGE_STATE),HttpStatus.OK
        );
    }


    //거래삭제
    @DeleteMapping("/uauth/api/contract/{id}")
    public ResponseEntity<Long> rejectContract(@PathVariable Long id) {
        contractService.delete(id);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.DELETE_CONTRACT,
                id),HttpStatus.OK
        );

    }

    // 거래목록조회 - 거래자 혹은 판매자의 모든 state상태
    @GetMapping("/uauth/api/contract")
    public ResponseEntity<List<ContractResponseDto>> getContract(@RequestParam String ver, Authentication authentication) {
        List<ContractResponseDto> responseDtoList = contractService.findContract(ver, authentication);
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

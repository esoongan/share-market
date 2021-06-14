package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.dto.file.FileResponseDto;
import ShareMarket.sharemarket.model.DefaultRes;
import ShareMarket.sharemarket.model.HttpResponseMessage;
import ShareMarket.sharemarket.model.HttpStatusCode;
import ShareMarket.sharemarket.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class FileController {

    private final FileService fileService;

    // 파일업로드
    // 요청에서 파일객체를 받아 FileDto리스트에 담아서 DB에 저장하고 결과를 반환함
    @PostMapping("/api/file/{postId}")
    public List<FileResponseDto> uploadMultipleFiles(@RequestParam("files") List<MultipartFile> files, @PathVariable Long postId) {
        List<FileResponseDto> fileDtoList = fileService.uploadFiles(files, postId);
        return fileDtoList;
    }

    // 게시글PK에 연관된 전체 파일조회
    // FileDto로 반환한다. -> 밑에거에서 id값은 빠짐
    @GetMapping("/api/file/{postId}")
    public List<FileResponseDto> getFiles(@PathVariable Long postId) {
        return fileService.getFile(postId);
    }

    @DeleteMapping("/api/file/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable Long id) throws FileNotFoundException {
        fileService.deleteFile(id);
        return new ResponseEntity(DefaultRes.response(
                HttpStatusCode.OK,
                HttpResponseMessage.DELETE_SUCCESS,
                id), HttpStatus.OK
        );
    }

//    @PutMapping("/api/file/upload/{id}")
//    public List<FileDto> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @PathVariable Long id) {
//        List<FileDto> fileDtoList = fileService.uploadFiles(files, id);
//        return fileDtoList;
//    }


    // FileEntity를 바로 반환하는안좋은 api
//    @GetMapping("/post/{id}/files")
//    public List<File> getFiles(@PathVariable Long id) {
//        return fileRepository.findAllByPost_id(id);
//    }


}

package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.file.FileRepository;
import ShareMarket.sharemarket.dto.file.FileDto;
import ShareMarket.sharemarket.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class FileController {

    private final FileService fileService;

    // 파일업로드
    // 요청에서 파일객체를 받아 FileDto리스트에 담아서 DB에 저장하고 결과를 반환함
    @PostMapping("/api/file/upload/{id}")
    public List<FileDto> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @PathVariable Long id) {
        List<FileDto> fileDtoList = fileService.uploadFiles(files, id);
        return fileDtoList;
    }

    // 파일조회
    // FileDto로 반환한다. -> 밑에거에서 id값은 빠짐
    @GetMapping("/api/file/{id}")
    public List<FileDto> getFiles(@PathVariable Long id) {
        return fileService.getFile(id);
    }

    // FileEntity를 바로 반환하는안좋은 api
//    @GetMapping("/post/{id}/files")
//    public List<File> getFiles(@PathVariable Long id) {
//        return fileRepository.findAllByPost_id(id);
//    }


}

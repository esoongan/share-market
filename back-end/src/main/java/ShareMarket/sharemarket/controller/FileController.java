package ShareMarket.sharemarket.controller;

import ShareMarket.sharemarket.domain.file.FileRepository;
import ShareMarket.sharemarket.dto.file.FileDto;
import ShareMarket.sharemarket.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private FileRepository fileRepository;


    // 사진 업로드하는 api
    // 요청에서 파일객체를 받아 FileDto리스트에 담아서 DB에 저장하고 결과를 반환함
    @PostMapping("/uploadMultipleFiles/{id}")
    public List<FileDto> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @PathVariable Long id) {
        List<FileDto> fileDtoList = fileService.uploadFiles(files, id);

        return fileDtoList;
    }

    //n번 게시글의 사진을 가져오는 api
    // FileDto로 반환한다. -> 밑에거에서 id값은 빠짐
    @GetMapping("/post/{id}/files")
    public List<FileDto> getFiles(@PathVariable Long id) {
        return fileService.getFile(id);
    }

    // FileEntity를 바로 반환하는안좋은 api
//    @GetMapping("/post/{id}/files")
//    public List<File> getFiles(@PathVariable Long id) {
//        return fileRepository.findAllByPost_id(id);
//    }


}

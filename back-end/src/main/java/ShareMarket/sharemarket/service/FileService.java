package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.file.File;
import ShareMarket.sharemarket.domain.file.FileRepository;
import ShareMarket.sharemarket.dto.file.FileDto;
import ShareMarket.sharemarket.dto.file.FileResponseDto;
import ShareMarket.sharemarket.exception.AttachFileException;
import ShareMarket.sharemarket.exception.FileNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;
    // System.getProperty("user.dir") : 절대경로를 구하는 방법

    //    private final String uploadPath = System.getProperty("user.dir");
   //private final String uploadPath = System.getProperty("user.dir") ;


    //서버에 생성할 파일명을 처리할 랜덤 문자열 반환
    private String getRandomString(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    // 서버에 첨부파일을 생성하고 업로드 파일목록 반환하는 함수 _ 인자로 파일리스트와 게시글아이디받음
    // MultipartFile[]타입의 files에는 업로드할 파일의 정보가 담겨있음
    public List<FileResponseDto> uploadFiles(List<MultipartFile> files, Long postId) {


        //업로드 파일 정보를 담을 비어있는 리스트
        List<FileResponseDto> attachList = new ArrayList<>();

        // 파일이 비어있으면 비어있는 리스트 반환
        if (files.isEmpty()){
            return attachList;
        }

        // 여기다가 저장할것임!!!
        String path = "/usr/local/etc/nginx/images";
        //String path = "/Users/iseungjin/Public/images";

        //path 해당하는 디렉터리가 존재하지 않으면, 부모 디렉터리를 포함한 모든디렉토리 생성
//        java.io.File dir = new java.io.File(path);
//        if (!dir.exists()) {
//            dir.mkdirs(); // mkdir()함수와 다른점은 상위 디렉토리가 존재하지 않으면, 그것까지 생성함
//        }

        // 파일 개수만큼 forEach실행
        for (MultipartFile file : files) {
            try {
                //파일 확장자 -> 기존파일의 확장자 가져올수 있도록 한다.
                final String extension = FilenameUtils.getExtension(file.getOriginalFilename());

                // 서버에 저장될 파일명 (랜덤문자열 + 확장자)
                final String saveName = getRandomString() + "." + extension;

                // 업로드 경로와 파일명이 담긴 파일객체를 생성
//                java.io.File target = new java.io.File(uploadPath+ "/"+path, saveName);
                java.io.File target = new java.io.File(path, saveName);

//                java.io.File target = new java.io.File(uploadPath, saveName);


                // target에 담긴 파일정보에 해당하는 파일을 생성
                // transferTo메서드는 서버에 물리적으로 파일을 생성하는 기능 (파일생성은 디스크에 영향을 주는 I/O작업임)
                file.transferTo(target);

                // 테이블에 파일정보를 저장하기위해 fileDto객체에 파일 정보를 담고 attachList에 파일정보를 추가
                FileDto fileDto = new FileDto();

                // fileDto에 게시글번호, 원본파일명, 서버파일명 저장후 DB에 저장! -> 빌더로 바꾸기
                fileDto.setPostId(postId);
                fileDto.setOrigFilename(file.getOriginalFilename());
                fileDto.setFilename(saveName);
//                fileDto.setFilepath(uploadPath+"/"+path);
                fileDto.setFilepath(path);

                // Dto객체 -> entity로 변환후 저장 -> 저장된 엔티티로 생성된 id값을 포함하는 reponseDto를 리턴
                File entity = fileRepository.save(fileDto.toEntity());
                FileResponseDto responseDto = new FileResponseDto(entity);

                // 파일 정보 추가
                attachList.add(responseDto);

            } catch (Exception e) {
                throw new AttachFileException("[" + file.getOriginalFilename() + "] failed to save file...");
            }
        }
        // 파일정보를 담은 리스트 반환
        return attachList;
    }

    @Transactional
    public List<FileResponseDto> getFile(Long id) {
        List<File> fileList = fileRepository.findAllByPostId(id);
        List<FileResponseDto> fileDtoList = new ArrayList<>();

        for (File file : fileList) {
            FileResponseDto responseDto = new FileResponseDto(file);

            fileDtoList.add(responseDto);
        }
        return fileDtoList;
    }

    @Transactional
    public void deleteFile(Long fileId){
        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new FileNotFoundException(fileId));

        fileRepository.delete(file);
    }

}

package ShareMarket.sharemarket.service;

import ShareMarket.sharemarket.domain.file.File;
import ShareMarket.sharemarket.domain.file.FileRepository;
import ShareMarket.sharemarket.dto.FileDto;
import ShareMarket.sharemarket.exception.AttachFileException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;
    // 지영 요청대로 폴더명 변경
    private final String uploadPath = System.getProperty("user.dir") + "_storage";

    //서버에 생성할 파일명을 처리할 랜덤 문자열 반  환
    private String getRandomString(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    // 서버에 첨부파일을 생성하고 업로드 파일목록 반환하는 함수 _ 인자로 파일리스트와 게시글아이디받음
    // MultipartFile[]타입의 files에는 업로드할 파일의 정보가 담겨있음
    public List<FileDto> uploadFiles(MultipartFile[] files, Long post_id) {

        // 파일이 비어있으면 비어있는 리스트 반환
        if (files[0].getSize() < 1){
            return Collections.emptyList();
        }
        //업로드 파일 정보를 담을 비어있는 리스트
        List<FileDto> attachList = new ArrayList<>();

        //uploadPath에 해당하는 디렉터리가 존재하지 않으면, 부모 디렉터리를 포함한 모든디렉토리 생성
        java.io.File dir = new java.io.File(uploadPath);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        // 파일 개수만큼 forEach실행
        for (MultipartFile file : files) {
            try {
                //파일 확장자 -> 기존파일의 확장자 가져올수 있도록 한다.
                final String extension = FilenameUtils.getExtension(file.getOriginalFilename());

                // 서버에 저장될 파일명 (랜덤문자열 + 확장자)
                final String saveName = getRandomString() + "." + extension;

                // target이라는 이름으로, 업로드 경로와 파일명이 담긴 파일객체를 생성
                java.io.File target = new java.io.File(uploadPath, saveName);

                // target에 담긴 파일정보에 해당하는 파일을 생성
                // transferTo메서드는 서버에 물리적으로 파일을 생성하는 기능 (파일생성은 디스크에 영향을 주는 I/O작업임)
                file.transferTo(target);

                // 테이블에 파일정보를 저장하기위해 fileDto객체에 파일 정보를 담고 attachList에 파일정보를 추가
                FileDto fileDto = new FileDto();

                // fileDto에 게시글번호, 원본파일명, 서버파일명 저장후 DB에 저장!
                fileDto.setPost_id(post_id);
                fileDto.setOrigFilename(file.getOriginalFilename());
                fileDto.setFilename(saveName);
                fileDto.setFilepath(uploadPath);

                // Dto객체를 엔티티에 담아 디비에 저장
                fileRepository.save(fileDto.toEntity());

                // 파일 정보 추가
                attachList.add(fileDto);

            } catch (Exception e) {
                throw new AttachFileException("[" + file.getOriginalFilename() + "] failed to save file...");
            }
        }
        // 파일정보를 담은 리스트 반환
        return attachList;
    }

    @Transactional
    public List<FileDto> getFile(Long id) {
        List<File> fileList = fileRepository.findAllByPost_id(id);
        List<FileDto> fileDtoList = new ArrayList<>();

        for (File file : fileList) {
            FileDto fileDto = new FileDto(file);

            fileDtoList.add(fileDto);
        }
        return fileDtoList;
    }

}

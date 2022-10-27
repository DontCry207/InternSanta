package com.dontcry.internsanta.common;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Component
public class S3Util {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket; // Bucket 이름
    @Autowired
    AmazonS3Client amazonS3Client;

//    public String uploadMagazineImageFile(MultipartFile multipartFile, Long magazineId) throws IOException {
//        String originalName = createFileName(multipartFile.getOriginalFilename()); // 파일 이름
//        long size = multipartFile.getSize(); // 파일 크기
//        String extension = originalName.substring(originalName.lastIndexOf("."));
//
//        if (!(extension.equals(".jpg") || extension.equals(".JPG") || extension.equals(".png") || extension.equals(".PNG") || extension.equals(".jpeg") || extension.equals(".JPEG"))) {
//            throw new FileUploadExtensionException("not allowed file extension", ErrorCode.FILE_UPLOAD_EXTENSION);
//        }
//
//        ObjectMetadata objectMetaData = new ObjectMetadata();
//        objectMetaData.setContentType(multipartFile.getContentType());
//        objectMetaData.setContentLength(size);
//
//        // S3 업로드
//        amazonS3Client.putObject(
//                new PutObjectRequest(bucket + "/member/" + magazineId, originalName, multipartFile.getInputStream(), objectMetaData)
//                        .withCannedAcl(CannedAccessControlList.PublicRead)
//        );
//        String magazineImageUrl = amazonS3Client.getUrl(bucket + "/magazine/" + magazineId, originalName).toString(); // 접근가능한 URL 가져오기
//        return magazineImageUrl;
//    }

    public void deleteFile(String fileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) { // 먼저 파일 업로드 시, 파일명을 난수화하기 위해 random으로 돌립니다.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) { // file 형식이 잘못된 경우를 확인하기 위해 만들어진 로직이며, 파일 타입과 상관없이 업로드할 수 있게 하기 위해 .의 존재 유무만 판단하였습니다.
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }
}

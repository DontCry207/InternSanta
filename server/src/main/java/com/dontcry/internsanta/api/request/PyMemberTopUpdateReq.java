package com.dontcry.internsanta.api.request;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Builder
public class PyMemberTopUpdateReq {
    List<MultipartFile> memberTopList;
}

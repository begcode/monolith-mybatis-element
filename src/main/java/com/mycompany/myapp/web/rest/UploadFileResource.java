package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.UploadFileRepository;
import com.mycompany.myapp.service.UploadFileQueryService;
import com.mycompany.myapp.service.UploadFileService;
import com.mycompany.myapp.web.rest.base.UploadFileBaseResource;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**

 * 管理实体{@link com.mycompany.myapp.domain.UploadFile}的REST Controller。
 */
@RestController
@RequestMapping("/api/upload-files")
@Tag(name = "upload-files", description = "上传文件API接口")
public class UploadFileResource extends UploadFileBaseResource {

    private final Logger log = LoggerFactory.getLogger(UploadFileResource.class);

    public UploadFileResource(
        UploadFileService uploadFileService,
        UploadFileRepository uploadFileRepository,
        UploadFileQueryService uploadFileQueryService
    ) {
        super(uploadFileService, uploadFileRepository, uploadFileQueryService);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

package com.mycompany.myapp.settings.web.rest;

import com.mycompany.myapp.settings.repository.CommonFieldDataRepository;
import com.mycompany.myapp.settings.service.CommonFieldDataQueryService;
import com.mycompany.myapp.settings.service.CommonFieldDataService;
import com.mycompany.myapp.settings.web.rest.base.CommonFieldDataBaseResource;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**

 * 管理实体{@link com.mycompany.myapp.settings.domain.CommonFieldData}的REST Controller。
 */
@RestController
@RequestMapping("/api/common-field-data")
@Tag(name = "common-field-data", description = "通用字段数据API接口")
public class CommonFieldDataResource extends CommonFieldDataBaseResource {

    private final Logger log = LoggerFactory.getLogger(CommonFieldDataResource.class);

    public CommonFieldDataResource(
        CommonFieldDataService commonFieldDataService,
        CommonFieldDataRepository commonFieldDataRepository,
        CommonFieldDataQueryService commonFieldDataQueryService
    ) {
        super(commonFieldDataService, commonFieldDataRepository, commonFieldDataQueryService);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

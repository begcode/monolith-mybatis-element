package com.mycompany.myapp.system.web.rest;

import com.mycompany.myapp.system.repository.FormConfigRepository;
import com.mycompany.myapp.system.service.FormConfigQueryService;
import com.mycompany.myapp.system.service.FormConfigService;
import com.mycompany.myapp.system.web.rest.base.FormConfigBaseResource;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**

 * 管理实体{@link com.mycompany.myapp.system.domain.FormConfig}的REST Controller。
 */
@RestController
@RequestMapping("/api/form-configs")
@Tag(name = "form-configs", description = "表单配置API接口")
public class FormConfigResource extends FormConfigBaseResource {

    private final Logger log = LoggerFactory.getLogger(FormConfigResource.class);

    public FormConfigResource(
        FormConfigService formConfigService,
        FormConfigRepository formConfigRepository,
        FormConfigQueryService formConfigQueryService
    ) {
        super(formConfigService, formConfigRepository, formConfigQueryService);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.ResourceCategoryRepository;
import com.mycompany.myapp.service.ResourceCategoryQueryService;
import com.mycompany.myapp.service.ResourceCategoryService;
import com.mycompany.myapp.web.rest.base.ResourceCategoryBaseResource;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**

 * 管理实体{@link com.mycompany.myapp.domain.ResourceCategory}的REST Controller。
 */
@RestController
@RequestMapping("/api/resource-categories")
@Tag(name = "resource-categories", description = "资源分类API接口")
public class ResourceCategoryResource extends ResourceCategoryBaseResource {

    private final Logger log = LoggerFactory.getLogger(ResourceCategoryResource.class);

    public ResourceCategoryResource(
        ResourceCategoryService resourceCategoryService,
        ResourceCategoryRepository resourceCategoryRepository,
        ResourceCategoryQueryService resourceCategoryQueryService
    ) {
        super(resourceCategoryService, resourceCategoryRepository, resourceCategoryQueryService);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

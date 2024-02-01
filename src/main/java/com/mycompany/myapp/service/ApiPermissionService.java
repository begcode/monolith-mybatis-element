package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ApiPermission;
import com.mycompany.myapp.repository.ApiPermissionRepository;
import com.mycompany.myapp.service.base.ApiPermissionBaseService;
import com.mycompany.myapp.service.mapper.ApiPermissionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

/**
 * Service Implementation for managing {@link ApiPermission}.
 */
@Service
public class ApiPermissionService extends ApiPermissionBaseService<ApiPermissionRepository, ApiPermission> {

    private final Logger log = LoggerFactory.getLogger(ApiPermissionService.class);

    public ApiPermissionService(
        ApiPermissionRepository apiPermissionRepository,
        CacheManager cacheManager,
        ApiPermissionMapper apiPermissionMapper,
        RequestMappingHandlerMapping requestMappingHandlerMapping
    ) {
        super(apiPermissionRepository, cacheManager, apiPermissionMapper, requestMappingHandlerMapping);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

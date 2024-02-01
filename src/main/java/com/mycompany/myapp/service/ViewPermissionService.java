package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.ViewPermission;
import com.mycompany.myapp.repository.ViewPermissionRepository;
import com.mycompany.myapp.service.base.ViewPermissionBaseService;
import com.mycompany.myapp.service.mapper.ViewPermissionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link ViewPermission}.
 */
@Service
public class ViewPermissionService extends ViewPermissionBaseService<ViewPermissionRepository, ViewPermission> {

    private final Logger log = LoggerFactory.getLogger(ViewPermissionService.class);

    public ViewPermissionService(
        ViewPermissionRepository viewPermissionRepository,
        CacheManager cacheManager,
        ViewPermissionMapper viewPermissionMapper
    ) {
        super(viewPermissionRepository, cacheManager, viewPermissionMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

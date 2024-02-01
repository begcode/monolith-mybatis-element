package com.mycompany.myapp.settings.service;

import com.mycompany.myapp.settings.domain.CommonFieldData;
import com.mycompany.myapp.settings.repository.CommonFieldDataRepository;
import com.mycompany.myapp.settings.service.base.CommonFieldDataBaseService;
import com.mycompany.myapp.settings.service.mapper.CommonFieldDataMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link CommonFieldData}.
 */
@Service
public class CommonFieldDataService extends CommonFieldDataBaseService<CommonFieldDataRepository, CommonFieldData> {

    private final Logger log = LoggerFactory.getLogger(CommonFieldDataService.class);

    public CommonFieldDataService(
        CommonFieldDataRepository commonFieldDataRepository,
        CacheManager cacheManager,
        CommonFieldDataMapper commonFieldDataMapper
    ) {
        super(commonFieldDataRepository, cacheManager, commonFieldDataMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

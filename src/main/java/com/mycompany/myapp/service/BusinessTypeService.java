package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.BusinessType;
import com.mycompany.myapp.repository.BusinessTypeRepository;
import com.mycompany.myapp.service.base.BusinessTypeBaseService;
import com.mycompany.myapp.service.mapper.BusinessTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link BusinessType}.
 */
@Service
public class BusinessTypeService extends BusinessTypeBaseService<BusinessTypeRepository, BusinessType> {

    private final Logger log = LoggerFactory.getLogger(BusinessTypeService.class);

    public BusinessTypeService(
        BusinessTypeRepository businessTypeRepository,
        CacheManager cacheManager,
        BusinessTypeMapper businessTypeMapper
    ) {
        super(businessTypeRepository, cacheManager, businessTypeMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

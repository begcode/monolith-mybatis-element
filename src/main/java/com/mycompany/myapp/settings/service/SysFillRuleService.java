package com.mycompany.myapp.settings.service;

import com.mycompany.myapp.settings.domain.SysFillRule;
import com.mycompany.myapp.settings.repository.SysFillRuleRepository;
import com.mycompany.myapp.settings.service.base.SysFillRuleBaseService;
import com.mycompany.myapp.settings.service.mapper.SysFillRuleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link SysFillRule}.
 */
@Service
public class SysFillRuleService extends SysFillRuleBaseService<SysFillRuleRepository, SysFillRule> {

    private final Logger log = LoggerFactory.getLogger(SysFillRuleService.class);

    public SysFillRuleService(SysFillRuleRepository sysFillRuleRepository, CacheManager cacheManager, SysFillRuleMapper sysFillRuleMapper) {
        super(sysFillRuleRepository, cacheManager, sysFillRuleMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

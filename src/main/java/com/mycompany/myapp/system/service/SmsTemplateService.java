package com.mycompany.myapp.system.service;

import com.mycompany.myapp.system.domain.SmsTemplate;
import com.mycompany.myapp.system.repository.SmsTemplateRepository;
import com.mycompany.myapp.system.service.base.SmsTemplateBaseService;
import com.mycompany.myapp.system.service.mapper.SmsTemplateMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link SmsTemplate}.
 */
@Service
public class SmsTemplateService extends SmsTemplateBaseService<SmsTemplateRepository, SmsTemplate> {

    private final Logger log = LoggerFactory.getLogger(SmsTemplateService.class);

    public SmsTemplateService(
        SmsSupplierService smsSupplierService,
        SmsTemplateRepository smsTemplateRepository,
        CacheManager cacheManager,
        SmsTemplateMapper smsTemplateMapper
    ) {
        super(smsSupplierService, smsTemplateRepository, cacheManager, smsTemplateMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

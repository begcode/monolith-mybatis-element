package com.mycompany.myapp.log.service;

import com.mycompany.myapp.log.domain.SysLog;
import com.mycompany.myapp.log.repository.SysLogRepository;
import com.mycompany.myapp.log.service.base.SysLogBaseService;
import com.mycompany.myapp.log.service.mapper.SysLogMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link SysLog}.
 */
@Service
public class SysLogService extends SysLogBaseService<SysLogRepository, SysLog> {

    private final Logger log = LoggerFactory.getLogger(SysLogService.class);

    public SysLogService(SysLogRepository sysLogRepository, CacheManager cacheManager, SysLogMapper sysLogMapper) {
        super(sysLogRepository, cacheManager, sysLogMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

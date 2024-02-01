package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.UReportFile;
import com.mycompany.myapp.repository.UReportFileRepository;
import com.mycompany.myapp.service.base.UReportFileBaseService;
import com.mycompany.myapp.service.mapper.UReportFileMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link UReportFile}.
 */
@Service
public class UReportFileService extends UReportFileBaseService<UReportFileRepository, UReportFile> {

    private final Logger log = LoggerFactory.getLogger(UReportFileService.class);

    public UReportFileService(UReportFileRepository uReportFileRepository, CacheManager cacheManager, UReportFileMapper uReportFileMapper) {
        super(uReportFileRepository, cacheManager, uReportFileMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

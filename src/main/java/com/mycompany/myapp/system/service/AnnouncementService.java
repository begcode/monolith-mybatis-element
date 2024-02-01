package com.mycompany.myapp.system.service;

import com.mycompany.myapp.service.UserQueryService;
import com.mycompany.myapp.system.domain.Announcement;
import com.mycompany.myapp.system.repository.AnnouncementRecordRepository;
import com.mycompany.myapp.system.repository.AnnouncementRepository;
import com.mycompany.myapp.system.service.base.AnnouncementBaseService;
import com.mycompany.myapp.system.service.mapper.AnnouncementMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

/**
 * Service Implementation for managing {@link Announcement}.
 */
@Service
public class AnnouncementService extends AnnouncementBaseService<AnnouncementRepository, Announcement> {

    private final Logger log = LoggerFactory.getLogger(AnnouncementService.class);

    public AnnouncementService(
        UserQueryService userQueryService,
        AnnouncementRecordRepository announcementRecordRepository,
        AnnouncementRepository announcementRepository,
        CacheManager cacheManager,
        AnnouncementMapper announcementMapper
    ) {
        super(userQueryService, announcementRecordRepository, announcementRepository, cacheManager, announcementMapper);
    }
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

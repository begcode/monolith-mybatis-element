package com.mycompany.myapp.system.repository.base;

import com.diboot.core.mapper.BaseCrudMapper;
import com.mycompany.myapp.system.domain.AnnouncementRecord;
import java.util.List;
import java.util.Optional;
import org.apache.ibatis.annotations.*;
import org.springframework.data.repository.NoRepositoryBean;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data JPA repository for the AnnouncementRecord entity.
 */
@SuppressWarnings("unused")
@NoRepositoryBean
public interface AnnouncementRecordBaseRepository<E extends AnnouncementRecord> extends BaseCrudMapper<AnnouncementRecord> {
    default List<AnnouncementRecord> findAll() {
        return this.selectList(null);
    }

    default Optional<AnnouncementRecord> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove

}

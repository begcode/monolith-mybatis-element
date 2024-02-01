package com.mycompany.myapp.settings.repository.base;

import com.diboot.core.mapper.BaseCrudMapper;
import com.mycompany.myapp.settings.domain.SysFillRule;
import java.util.List;
import java.util.Optional;
import org.apache.ibatis.annotations.*;
import org.springframework.data.repository.NoRepositoryBean;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data JPA repository for the SysFillRule entity.
 */
@SuppressWarnings("unused")
@NoRepositoryBean
public interface SysFillRuleBaseRepository<E extends SysFillRule> extends BaseCrudMapper<SysFillRule> {
    default List<SysFillRule> findAll() {
        return this.selectList(null);
    }

    default Optional<SysFillRule> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove

}

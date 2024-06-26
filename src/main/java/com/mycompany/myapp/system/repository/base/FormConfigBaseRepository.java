package com.mycompany.myapp.system.repository.base;

import com.diboot.core.binding.Binder;
import com.diboot.core.mapper.BaseCrudMapper;
import com.mycompany.myapp.system.domain.FormConfig;
import java.util.List;
import java.util.Optional;
import org.apache.ibatis.annotations.*;
import org.springframework.data.repository.NoRepositoryBean;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data JPA repository for the FormConfig entity.
 */
@NoRepositoryBean
public interface FormConfigBaseRepository<E extends FormConfig> extends BaseCrudMapper<FormConfig> {
    default Optional<FormConfig> findOneWithEagerRelationships(Long id) {
        return Optional.ofNullable(this.selectById(id)).map(formConfig -> {
            Binder.bindRelations(formConfig, new String[] { "businessType" });
            return formConfig;
        });
    }

    default List<FormConfig> findAll() {
        return this.selectList(null);
    }

    default Optional<FormConfig> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }

    @Select("delete from form_config formConfig where formConfig.business_type = #{businessTypeId}")
    void deleteAllByBusinessTypeId(@Param("businessTypeId") Long businessTypeId);
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove

}

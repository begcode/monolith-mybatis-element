package com.mycompany.myapp.repository.base;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.diboot.core.binding.Binder;
import com.diboot.core.mapper.BaseCrudMapper;
import com.mycompany.myapp.domain.Authority;
import java.util.List;
import java.util.Optional;
import org.apache.ibatis.annotations.*;
import org.springframework.data.repository.NoRepositoryBean;

// jhipster-needle-add-import - JHipster will add getters and setters here, do not remove

/**
 * Spring Data JPA repository for the Authority entity.
 *
 * When extending this class, extend AuthorityRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@NoRepositoryBean
public interface AuthorityBaseRepository<E extends Authority> extends BaseCrudMapper<Authority> {
    default Optional<Authority> findOneWithEagerRelationships(Long id) {
        return Optional.ofNullable(this.selectById(id)).map(authority -> {
            Binder.bindRelations(
                authority,
                new String[] { "children", "viewPermissions", "apiPermissions", "parent", "users", "department" }
            );
            return authority;
        });
    }

    default List<Authority> findAll() {
        return this.selectList(null);
    }

    default Optional<Authority> findById(Long id) {
        return Optional.ofNullable(this.selectById(id));
    }

    @Select("delete from jhi_authority authority where authority.parent = #{parentId}")
    void deleteAllByParentId(@Param("parentId") Long parentId);

    default IPage<Authority> findAllByParentIsNull(IPage<Authority> pageable) {
        return this.selectPage(pageable, new QueryWrapper<Authority>().isNull("parent_id"));
    }

    default Optional<Authority> findFirstByCode(String code) {
        return Optional.ofNullable(this.selectOne(new LambdaQueryWrapper<Authority>().eq(Authority::getCode, code)));
    }
    // jhipster-needle-repository-add-method - JHipster will add getters and setters here, do not remove

}

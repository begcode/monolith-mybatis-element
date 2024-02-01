package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Authority;
import com.mycompany.myapp.repository.base.AuthorityBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AuthorityRepository extends AuthorityBaseRepository<Authority> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

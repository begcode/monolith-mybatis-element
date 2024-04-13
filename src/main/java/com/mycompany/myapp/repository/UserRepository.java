package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.base.UserBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository extends UserBaseRepository<User> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

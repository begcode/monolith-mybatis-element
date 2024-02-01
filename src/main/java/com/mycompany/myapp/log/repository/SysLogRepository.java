package com.mycompany.myapp.log.repository;

import com.mycompany.myapp.log.domain.SysLog;
import com.mycompany.myapp.log.repository.base.SysLogBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SysLogRepository extends SysLogBaseRepository<SysLog> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

package com.mycompany.myapp.oss.repository;

import com.mycompany.myapp.oss.domain.OssConfig;
import com.mycompany.myapp.oss.repository.base.OssConfigBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OssConfigRepository extends OssConfigBaseRepository<OssConfig> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

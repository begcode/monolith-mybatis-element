package com.mycompany.myapp.settings.repository;

import com.mycompany.myapp.settings.domain.RegionCode;
import com.mycompany.myapp.settings.repository.base.RegionCodeBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RegionCodeRepository extends RegionCodeBaseRepository<RegionCode> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

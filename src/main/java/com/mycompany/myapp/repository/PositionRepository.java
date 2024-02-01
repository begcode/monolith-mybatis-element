package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Position;
import com.mycompany.myapp.repository.base.PositionBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PositionRepository extends PositionBaseRepository<Position> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

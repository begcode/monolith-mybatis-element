package com.mycompany.myapp.oss.service.mapper;

import com.mycompany.myapp.oss.domain.OssConfig;
import com.mycompany.myapp.oss.service.dto.OssConfigDTO;
import com.mycompany.myapp.service.mapper.EntityMapper;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link OssConfig} and its DTO {@link OssConfigDTO}.
 */
@Mapper(componentModel = "spring")
public interface OssConfigMapper extends EntityMapper<OssConfigDTO, OssConfig> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

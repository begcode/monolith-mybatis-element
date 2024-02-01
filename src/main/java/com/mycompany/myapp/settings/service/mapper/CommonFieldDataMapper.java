package com.mycompany.myapp.settings.service.mapper;

import com.mycompany.myapp.service.mapper.EntityMapper;
import com.mycompany.myapp.settings.domain.CommonFieldData;
import com.mycompany.myapp.settings.service.dto.CommonFieldDataDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CommonFieldData} and its DTO {@link CommonFieldDataDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommonFieldDataMapper extends EntityMapper<CommonFieldDataDTO, CommonFieldData> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

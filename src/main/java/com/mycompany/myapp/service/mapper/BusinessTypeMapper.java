package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.BusinessType;
import com.mycompany.myapp.service.dto.BusinessTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link BusinessType} and its DTO {@link BusinessTypeDTO}.
 */
@Mapper(componentModel = "spring")
public interface BusinessTypeMapper extends EntityMapper<BusinessTypeDTO, BusinessType> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

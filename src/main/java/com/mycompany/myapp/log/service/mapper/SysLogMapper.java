package com.mycompany.myapp.log.service.mapper;

import com.mycompany.myapp.log.domain.SysLog;
import com.mycompany.myapp.log.service.dto.SysLogDTO;
import com.mycompany.myapp.service.mapper.EntityMapper;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link SysLog} and its DTO {@link SysLogDTO}.
 */
@Mapper(componentModel = "spring")
public interface SysLogMapper extends EntityMapper<SysLogDTO, SysLog> {
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    SysLog toEntity(SysLogDTO sysLogDTO);
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

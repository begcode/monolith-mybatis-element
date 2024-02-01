package com.mycompany.myapp.settings.service.mapper;

import com.mycompany.myapp.service.mapper.EntityMapper;
import com.mycompany.myapp.settings.domain.FillRuleItem;
import com.mycompany.myapp.settings.domain.SysFillRule;
import com.mycompany.myapp.settings.service.dto.FillRuleItemDTO;
import com.mycompany.myapp.settings.service.dto.SysFillRuleDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link FillRuleItem} and its DTO {@link FillRuleItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface FillRuleItemMapper extends EntityMapper<FillRuleItemDTO, FillRuleItem> {
    @Mapping(target = "fillRule", source = "fillRule", qualifiedByName = "sysFillRuleName")
    FillRuleItemDTO toDto(FillRuleItem s);

    @Named("sysFillRuleName")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    SysFillRuleDTO toDtoSysFillRuleName(SysFillRule sysFillRule);
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

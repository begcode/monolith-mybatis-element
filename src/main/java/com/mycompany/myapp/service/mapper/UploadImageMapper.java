package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.ResourceCategory;
import com.mycompany.myapp.domain.UploadImage;
import com.mycompany.myapp.service.dto.ResourceCategoryDTO;
import com.mycompany.myapp.service.dto.UploadImageDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UploadImage} and its DTO {@link UploadImageDTO}.
 */
@Mapper(componentModel = "spring")
public interface UploadImageMapper extends EntityMapper<UploadImageDTO, UploadImage> {
    @Mapping(target = "category", source = "category", qualifiedByName = "resourceCategoryTitle")
    UploadImageDTO toDto(UploadImage s);

    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    UploadImage toEntity(UploadImageDTO uploadImageDTO);

    @Named("resourceCategoryTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    ResourceCategoryDTO toDtoResourceCategoryTitle(ResourceCategory resourceCategory);
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

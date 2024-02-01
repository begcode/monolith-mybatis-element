package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.ResourceCategory;
import com.mycompany.myapp.domain.UploadFile;
import com.mycompany.myapp.service.dto.ResourceCategoryDTO;
import com.mycompany.myapp.service.dto.UploadFileDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link UploadFile} and its DTO {@link UploadFileDTO}.
 */
@Mapper(componentModel = "spring")
public interface UploadFileMapper extends EntityMapper<UploadFileDTO, UploadFile> {
    @Mapping(target = "category", source = "category", qualifiedByName = "resourceCategoryTitle")
    UploadFileDTO toDto(UploadFile s);

    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    UploadFile toEntity(UploadFileDTO uploadFileDTO);

    @Named("resourceCategoryTitle")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    ResourceCategoryDTO toDtoResourceCategoryTitle(ResourceCategory resourceCategory);
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

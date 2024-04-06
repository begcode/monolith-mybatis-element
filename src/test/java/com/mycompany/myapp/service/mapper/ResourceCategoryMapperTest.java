package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.ResourceCategoryAsserts.*;
import static com.mycompany.myapp.domain.ResourceCategoryTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ResourceCategoryMapperTest {

    private ResourceCategoryMapper resourceCategoryMapper;

    @BeforeEach
    void setUp() {
        resourceCategoryMapper = new ResourceCategoryMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getResourceCategorySample1();
        var actual = resourceCategoryMapper.toEntity(resourceCategoryMapper.toDto(expected));
        assertResourceCategoryAllPropertiesEquals(expected, actual);
    }
}

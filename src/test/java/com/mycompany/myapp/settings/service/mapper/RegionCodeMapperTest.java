package com.mycompany.myapp.settings.service.mapper;

import static com.mycompany.myapp.settings.domain.RegionCodeAsserts.*;
import static com.mycompany.myapp.settings.domain.RegionCodeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RegionCodeMapperTest {

    private RegionCodeMapper regionCodeMapper;

    @BeforeEach
    void setUp() {
        regionCodeMapper = new RegionCodeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getRegionCodeSample1();
        var actual = regionCodeMapper.toEntity(regionCodeMapper.toDto(expected));
        assertRegionCodeAllPropertiesEquals(expected, actual);
    }
}

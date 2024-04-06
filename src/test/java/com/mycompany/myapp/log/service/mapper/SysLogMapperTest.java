package com.mycompany.myapp.log.service.mapper;

import static com.mycompany.myapp.log.domain.SysLogAsserts.*;
import static com.mycompany.myapp.log.domain.SysLogTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SysLogMapperTest {

    private SysLogMapper sysLogMapper;

    @BeforeEach
    void setUp() {
        sysLogMapper = new SysLogMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getSysLogSample1();
        var actual = sysLogMapper.toEntity(sysLogMapper.toDto(expected));
        assertSysLogAllPropertiesEquals(expected, actual);
    }
}

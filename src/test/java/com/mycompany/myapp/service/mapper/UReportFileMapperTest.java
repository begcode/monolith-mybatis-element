package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.UReportFileAsserts.*;
import static com.mycompany.myapp.domain.UReportFileTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UReportFileMapperTest {

    private UReportFileMapper uReportFileMapper;

    @BeforeEach
    void setUp() {
        uReportFileMapper = new UReportFileMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getUReportFileSample1();
        var actual = uReportFileMapper.toEntity(uReportFileMapper.toDto(expected));
        assertUReportFileAllPropertiesEquals(expected, actual);
    }
}

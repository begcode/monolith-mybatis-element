package com.mycompany.myapp.system.service.mapper;

import static com.mycompany.myapp.system.domain.SmsTemplateAsserts.*;
import static com.mycompany.myapp.system.domain.SmsTemplateTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SmsTemplateMapperTest {

    private SmsTemplateMapper smsTemplateMapper;

    @BeforeEach
    void setUp() {
        smsTemplateMapper = new SmsTemplateMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getSmsTemplateSample1();
        var actual = smsTemplateMapper.toEntity(smsTemplateMapper.toDto(expected));
        assertSmsTemplateAllPropertiesEquals(expected, actual);
    }
}

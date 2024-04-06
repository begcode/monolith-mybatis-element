package com.mycompany.myapp.system.service.mapper;

import static com.mycompany.myapp.system.domain.SmsSupplierAsserts.*;
import static com.mycompany.myapp.system.domain.SmsSupplierTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SmsSupplierMapperTest {

    private SmsSupplierMapper smsSupplierMapper;

    @BeforeEach
    void setUp() {
        smsSupplierMapper = new SmsSupplierMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getSmsSupplierSample1();
        var actual = smsSupplierMapper.toEntity(smsSupplierMapper.toDto(expected));
        assertSmsSupplierAllPropertiesEquals(expected, actual);
    }
}

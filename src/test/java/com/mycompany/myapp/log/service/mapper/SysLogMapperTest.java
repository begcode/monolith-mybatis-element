package com.mycompany.myapp.log.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class SysLogMapperTest {

    private SysLogMapper sysLogMapper;

    @BeforeEach
    public void setUp() {
        sysLogMapper = new SysLogMapperImpl();
    }
}

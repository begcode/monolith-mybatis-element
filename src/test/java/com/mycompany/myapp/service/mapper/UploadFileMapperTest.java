package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.UploadFileAsserts.*;
import static com.mycompany.myapp.domain.UploadFileTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UploadFileMapperTest {

    private UploadFileMapper uploadFileMapper;

    @BeforeEach
    void setUp() {
        uploadFileMapper = new UploadFileMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getUploadFileSample1();
        var actual = uploadFileMapper.toEntity(uploadFileMapper.toDto(expected));
        assertUploadFileAllPropertiesEquals(expected, actual);
    }
}

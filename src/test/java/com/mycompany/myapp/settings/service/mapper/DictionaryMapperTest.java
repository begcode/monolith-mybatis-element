package com.mycompany.myapp.settings.service.mapper;

import static com.mycompany.myapp.settings.domain.DictionaryAsserts.*;
import static com.mycompany.myapp.settings.domain.DictionaryTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DictionaryMapperTest {

    private DictionaryMapper dictionaryMapper;

    @BeforeEach
    void setUp() {
        dictionaryMapper = new DictionaryMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDictionarySample1();
        var actual = dictionaryMapper.toEntity(dictionaryMapper.toDto(expected));
        assertDictionaryAllPropertiesEquals(expected, actual);
    }
}

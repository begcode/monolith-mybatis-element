package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.AuthorityAsserts.*;
import static com.mycompany.myapp.domain.AuthorityTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AuthorityMapperTest {

    private AuthorityMapper authorityMapper;

    @BeforeEach
    void setUp() {
        authorityMapper = new AuthorityMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAuthoritySample1();
        var actual = authorityMapper.toEntity(authorityMapper.toDto(expected));
        assertAuthorityAllPropertiesEquals(expected, actual);
    }
}

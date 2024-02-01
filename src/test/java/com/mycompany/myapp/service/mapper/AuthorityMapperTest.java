package com.mycompany.myapp.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class AuthorityMapperTest {

    private AuthorityMapper authorityMapper;

    @BeforeEach
    public void setUp() {
        authorityMapper = new AuthorityMapperImpl();
    }
}

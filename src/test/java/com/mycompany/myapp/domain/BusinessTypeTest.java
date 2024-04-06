package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.BusinessTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.*;
import org.junit.jupiter.api.Test;

class BusinessTypeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BusinessType.class);
        BusinessType businessType1 = getBusinessTypeSample1();
        BusinessType businessType2 = new BusinessType();
        assertThat(businessType1).isNotEqualTo(businessType2);

        businessType2.setId(businessType1.getId());
        assertThat(businessType1).isEqualTo(businessType2);

        businessType2 = getBusinessTypeSample2();
        assertThat(businessType1).isNotEqualTo(businessType2);
    }
}

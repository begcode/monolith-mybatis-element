package com.mycompany.myapp.oss.domain;

import static com.mycompany.myapp.oss.domain.OssConfigTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OssConfigTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OssConfig.class);
        OssConfig ossConfig1 = getOssConfigSample1();
        OssConfig ossConfig2 = new OssConfig();
        assertThat(ossConfig1).isNotEqualTo(ossConfig2);

        ossConfig2.setId(ossConfig1.getId());
        assertThat(ossConfig1).isEqualTo(ossConfig2);

        ossConfig2 = getOssConfigSample2();
        assertThat(ossConfig1).isNotEqualTo(ossConfig2);
    }
}

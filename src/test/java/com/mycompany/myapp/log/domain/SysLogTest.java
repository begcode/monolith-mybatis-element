package com.mycompany.myapp.log.domain;

import static com.mycompany.myapp.log.domain.SysLogTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.*;
import org.junit.jupiter.api.Test;

class SysLogTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SysLog.class);
        SysLog sysLog1 = getSysLogSample1();
        SysLog sysLog2 = new SysLog();
        assertThat(sysLog1).isNotEqualTo(sysLog2);

        sysLog2.setId(sysLog1.getId());
        assertThat(sysLog1).isEqualTo(sysLog2);

        sysLog2 = getSysLogSample2();
        assertThat(sysLog1).isNotEqualTo(sysLog2);
    }
}

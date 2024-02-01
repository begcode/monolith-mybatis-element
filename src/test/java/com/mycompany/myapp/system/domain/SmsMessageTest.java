package com.mycompany.myapp.system.domain;

import static com.mycompany.myapp.system.domain.SmsMessageTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SmsMessageTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SmsMessage.class);
        SmsMessage smsMessage1 = getSmsMessageSample1();
        SmsMessage smsMessage2 = new SmsMessage();
        assertThat(smsMessage1).isNotEqualTo(smsMessage2);

        smsMessage2.setId(smsMessage1.getId());
        assertThat(smsMessage1).isEqualTo(smsMessage2);

        smsMessage2 = getSmsMessageSample2();
        assertThat(smsMessage1).isNotEqualTo(smsMessage2);
    }
}

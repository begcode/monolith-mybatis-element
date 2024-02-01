package com.mycompany.myapp.system.domain;

import static com.mycompany.myapp.system.domain.AnnouncementRecordTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AnnouncementRecordTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AnnouncementRecord.class);
        AnnouncementRecord announcementRecord1 = getAnnouncementRecordSample1();
        AnnouncementRecord announcementRecord2 = new AnnouncementRecord();
        assertThat(announcementRecord1).isNotEqualTo(announcementRecord2);

        announcementRecord2.setId(announcementRecord1.getId());
        assertThat(announcementRecord1).isEqualTo(announcementRecord2);

        announcementRecord2 = getAnnouncementRecordSample2();
        assertThat(announcementRecord1).isNotEqualTo(announcementRecord2);
    }
}

package com.mycompany.myapp.system.domain;

import static com.mycompany.myapp.domain.AssertUtils.zonedDataTimeSameInstant;
import static org.assertj.core.api.Assertions.assertThat;

public class SmsMessageAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSmsMessageAllPropertiesEquals(SmsMessage expected, SmsMessage actual) {
        assertSmsMessageAutoGeneratedPropertiesEquals(expected, actual);
        assertSmsMessageAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSmsMessageAllUpdatablePropertiesEquals(SmsMessage expected, SmsMessage actual) {
        assertSmsMessageUpdatableFieldsEquals(expected, actual);
        assertSmsMessageUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSmsMessageAutoGeneratedPropertiesEquals(SmsMessage expected, SmsMessage actual) {
        assertThat(expected)
            .as("Verify SmsMessage auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSmsMessageUpdatableFieldsEquals(SmsMessage expected, SmsMessage actual) {
        assertThat(expected)
            .as("Verify SmsMessage relevant properties")
            .satisfies(e -> assertThat(e.getTitle()).as("check title").isEqualTo(actual.getTitle()))
            .satisfies(e -> assertThat(e.getSendType()).as("check sendType").isEqualTo(actual.getSendType()))
            .satisfies(e -> assertThat(e.getReceiver()).as("check receiver").isEqualTo(actual.getReceiver()))
            .satisfies(e -> assertThat(e.getParams()).as("check params").isEqualTo(actual.getParams()))
            .satisfies(e -> assertThat(e.getContent()).as("check content").isEqualTo(actual.getContent()))
            .satisfies(
                e ->
                    assertThat(e.getSendTime())
                        .as("check sendTime")
                        .usingComparator(zonedDataTimeSameInstant)
                        .isEqualTo(actual.getSendTime())
            )
            .satisfies(e -> assertThat(e.getSendStatus()).as("check sendStatus").isEqualTo(actual.getSendStatus()))
            .satisfies(e -> assertThat(e.getRetryNum()).as("check retryNum").isEqualTo(actual.getRetryNum()))
            .satisfies(e -> assertThat(e.getFailResult()).as("check failResult").isEqualTo(actual.getFailResult()))
            .satisfies(e -> assertThat(e.getRemark()).as("check remark").isEqualTo(actual.getRemark()))
            .satisfies(e -> assertThat(e.getCreatedBy()).as("check createdBy").isEqualTo(actual.getCreatedBy()))
            .satisfies(e -> assertThat(e.getCreatedDate()).as("check createdDate").isEqualTo(actual.getCreatedDate()))
            .satisfies(e -> assertThat(e.getLastModifiedBy()).as("check lastModifiedBy").isEqualTo(actual.getLastModifiedBy()))
            .satisfies(e -> assertThat(e.getLastModifiedDate()).as("check lastModifiedDate").isEqualTo(actual.getLastModifiedDate()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertSmsMessageUpdatableRelationshipsEquals(SmsMessage expected, SmsMessage actual) {}
}

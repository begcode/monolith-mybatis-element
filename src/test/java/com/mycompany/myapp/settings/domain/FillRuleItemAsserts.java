package com.mycompany.myapp.settings.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class FillRuleItemAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFillRuleItemAllPropertiesEquals(FillRuleItem expected, FillRuleItem actual) {
        assertFillRuleItemAutoGeneratedPropertiesEquals(expected, actual);
        assertFillRuleItemAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFillRuleItemAllUpdatablePropertiesEquals(FillRuleItem expected, FillRuleItem actual) {
        assertFillRuleItemUpdatableFieldsEquals(expected, actual);
        assertFillRuleItemUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFillRuleItemAutoGeneratedPropertiesEquals(FillRuleItem expected, FillRuleItem actual) {
        assertThat(expected)
            .as("Verify FillRuleItem auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFillRuleItemUpdatableFieldsEquals(FillRuleItem expected, FillRuleItem actual) {
        assertThat(expected)
            .as("Verify FillRuleItem relevant properties")
            .satisfies(e -> assertThat(e.getSortValue()).as("check sortValue").isEqualTo(actual.getSortValue()))
            .satisfies(e -> assertThat(e.getFieldParamType()).as("check fieldParamType").isEqualTo(actual.getFieldParamType()))
            .satisfies(e -> assertThat(e.getFieldParamValue()).as("check fieldParamValue").isEqualTo(actual.getFieldParamValue()))
            .satisfies(e -> assertThat(e.getDatePattern()).as("check datePattern").isEqualTo(actual.getDatePattern()))
            .satisfies(e -> assertThat(e.getSeqLength()).as("check seqLength").isEqualTo(actual.getSeqLength()))
            .satisfies(e -> assertThat(e.getSeqIncrement()).as("check seqIncrement").isEqualTo(actual.getSeqIncrement()))
            .satisfies(e -> assertThat(e.getSeqStartValue()).as("check seqStartValue").isEqualTo(actual.getSeqStartValue()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertFillRuleItemUpdatableRelationshipsEquals(FillRuleItem expected, FillRuleItem actual) {
        assertThat(expected)
            .as("Verify FillRuleItem relationships")
            .satisfies(e -> assertThat(e.getFillRule()).as("check fillRule").isEqualTo(actual.getFillRule()));
    }
}
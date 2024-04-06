package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class BusinessTypeAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBusinessTypeAllPropertiesEquals(BusinessType expected, BusinessType actual) {
        assertBusinessTypeAutoGeneratedPropertiesEquals(expected, actual);
        assertBusinessTypeAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBusinessTypeAllUpdatablePropertiesEquals(BusinessType expected, BusinessType actual) {
        assertBusinessTypeUpdatableFieldsEquals(expected, actual);
        assertBusinessTypeUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBusinessTypeAutoGeneratedPropertiesEquals(BusinessType expected, BusinessType actual) {
        assertThat(expected)
            .as("Verify BusinessType auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBusinessTypeUpdatableFieldsEquals(BusinessType expected, BusinessType actual) {
        assertThat(expected)
            .as("Verify BusinessType relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getCode()).as("check code").isEqualTo(actual.getCode()))
            .satisfies(e -> assertThat(e.getDescription()).as("check description").isEqualTo(actual.getDescription()))
            .satisfies(e -> assertThat(e.getIcon()).as("check icon").isEqualTo(actual.getIcon()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertBusinessTypeUpdatableRelationshipsEquals(BusinessType expected, BusinessType actual) {}
}

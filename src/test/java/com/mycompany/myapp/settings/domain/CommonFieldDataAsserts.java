package com.mycompany.myapp.settings.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class CommonFieldDataAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonFieldDataAllPropertiesEquals(CommonFieldData expected, CommonFieldData actual) {
        assertCommonFieldDataAutoGeneratedPropertiesEquals(expected, actual);
        assertCommonFieldDataAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonFieldDataAllUpdatablePropertiesEquals(CommonFieldData expected, CommonFieldData actual) {
        assertCommonFieldDataUpdatableFieldsEquals(expected, actual);
        assertCommonFieldDataUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonFieldDataAutoGeneratedPropertiesEquals(CommonFieldData expected, CommonFieldData actual) {
        assertThat(expected)
            .as("Verify CommonFieldData auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonFieldDataUpdatableFieldsEquals(CommonFieldData expected, CommonFieldData actual) {
        assertThat(expected)
            .as("Verify CommonFieldData relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getValue()).as("check value").isEqualTo(actual.getValue()))
            .satisfies(e -> assertThat(e.getLabel()).as("check label").isEqualTo(actual.getLabel()))
            .satisfies(e -> assertThat(e.getValueType()).as("check valueType").isEqualTo(actual.getValueType()))
            .satisfies(e -> assertThat(e.getRemark()).as("check remark").isEqualTo(actual.getRemark()))
            .satisfies(e -> assertThat(e.getSortValue()).as("check sortValue").isEqualTo(actual.getSortValue()))
            .satisfies(e -> assertThat(e.getDisabled()).as("check disabled").isEqualTo(actual.getDisabled()))
            .satisfies(e -> assertThat(e.getOwnerEntityName()).as("check ownerEntityName").isEqualTo(actual.getOwnerEntityName()))
            .satisfies(e -> assertThat(e.getOwnerEntityId()).as("check ownerEntityId").isEqualTo(actual.getOwnerEntityId()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertCommonFieldDataUpdatableRelationshipsEquals(CommonFieldData expected, CommonFieldData actual) {
        assertThat(expected).as("Verify CommonFieldData relationships");
    }
}

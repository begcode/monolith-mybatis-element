package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AssertUtils.zonedDataTimeSameInstant;
import static org.assertj.core.api.Assertions.assertThat;

public class UReportFileAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertUReportFileAllPropertiesEquals(UReportFile expected, UReportFile actual) {
        assertUReportFileAutoGeneratedPropertiesEquals(expected, actual);
        assertUReportFileAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertUReportFileAllUpdatablePropertiesEquals(UReportFile expected, UReportFile actual) {
        assertUReportFileUpdatableFieldsEquals(expected, actual);
        assertUReportFileUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertUReportFileAutoGeneratedPropertiesEquals(UReportFile expected, UReportFile actual) {
        assertThat(expected)
            .as("Verify UReportFile auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertUReportFileUpdatableFieldsEquals(UReportFile expected, UReportFile actual) {
        assertThat(expected)
            .as("Verify UReportFile relevant properties")
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()))
            .satisfies(e -> assertThat(e.getContent()).as("check content").isEqualTo(actual.getContent()))
            .satisfies(
                e ->
                    assertThat(e.getCreateAt())
                        .as("check createAt")
                        .usingComparator(zonedDataTimeSameInstant)
                        .isEqualTo(actual.getCreateAt())
            )
            .satisfies(
                e ->
                    assertThat(e.getUpdateAt())
                        .as("check updateAt")
                        .usingComparator(zonedDataTimeSameInstant)
                        .isEqualTo(actual.getUpdateAt())
            );
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertUReportFileUpdatableRelationshipsEquals(UReportFile expected, UReportFile actual) {}
}

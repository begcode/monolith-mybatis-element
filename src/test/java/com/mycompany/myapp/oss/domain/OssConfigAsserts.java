package com.mycompany.myapp.oss.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class OssConfigAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertOssConfigAllPropertiesEquals(OssConfig expected, OssConfig actual) {
        assertOssConfigAutoGeneratedPropertiesEquals(expected, actual);
        assertOssConfigAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertOssConfigAllUpdatablePropertiesEquals(OssConfig expected, OssConfig actual) {
        assertOssConfigUpdatableFieldsEquals(expected, actual);
        assertOssConfigUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertOssConfigAutoGeneratedPropertiesEquals(OssConfig expected, OssConfig actual) {
        assertThat(expected)
            .as("Verify OssConfig auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertOssConfigUpdatableFieldsEquals(OssConfig expected, OssConfig actual) {
        assertThat(expected)
            .as("Verify OssConfig relevant properties")
            .satisfies(e -> assertThat(e.getProvider()).as("check provider").isEqualTo(actual.getProvider()))
            .satisfies(e -> assertThat(e.getPlatform()).as("check platform").isEqualTo(actual.getPlatform()))
            .satisfies(e -> assertThat(e.getEnabled()).as("check enabled").isEqualTo(actual.getEnabled()))
            .satisfies(e -> assertThat(e.getRemark()).as("check remark").isEqualTo(actual.getRemark()))
            .satisfies(e -> assertThat(e.getConfigData()).as("check configData").isEqualTo(actual.getConfigData()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertOssConfigUpdatableRelationshipsEquals(OssConfig expected, OssConfig actual) {}
}

package com.mycompany.myapp.domain.enumeration;

import com.baomidou.mybatisplus.annotation.EnumValue;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * 字段参数类型
 */
public enum FieldParamType {
    /**
     * 日期时间
     */
    DATETIME("DATETIME", "日期时间"),
    /**
     * 数字序列
     */
    NUMBER("NUMBER", "数字序列"),
    /**
     * 固定字符
     */
    FIXED_CHAR("FIXED_CHAR", "固定字符"),
    /**
     * 参数
     */
    PARAM("PARAM", "参数");

    @EnumValue
    @JsonValue
    private final String value;

    private final String desc;

    FieldParamType(String value, String desc) {
        this.value = value;
        this.desc = desc;
    }

    public String getValue() {
        return value;
    }

    public String getDesc() {
        return desc;
    }

    public static FieldParamType getByValue(String value) {
        for (FieldParamType enumFieldParamType : FieldParamType.values()) {
            if (enumFieldParamType.getValue().equals(value)) {
                return enumFieldParamType;
            }
        }
        return null;
    }

    public static FieldParamType getByDesc(String desc) {
        for (FieldParamType enumFieldParamType : FieldParamType.values()) {
            if (enumFieldParamType.getDesc().equals(desc)) {
                return enumFieldParamType;
            }
        }
        return null;
    }
}

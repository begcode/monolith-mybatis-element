package com.mycompany.myapp.security.annotation;

import com.mycompany.myapp.domain.enumeration.ApiPermissionState;
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.TYPE })
@Inherited
@Documented
public @interface PermissionDefine {
    String groupName() default "系统设置";

    String groupCode() default "GROUP_SYSTEM";

    String entityCode();

    String entityName();

    String permissionName();

    String permissionCode();

    ApiPermissionState state() default ApiPermissionState.PERMIT_ALL;
}

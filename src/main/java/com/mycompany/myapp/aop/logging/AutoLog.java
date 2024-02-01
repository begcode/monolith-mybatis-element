package com.mycompany.myapp.aop.logging;

import com.mycompany.myapp.domain.enumeration.LogType;
import com.mycompany.myapp.domain.enumeration.OperateType;
import java.lang.annotation.*;

/**
 * 系统日志注解
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface AutoLog {
    /**
     * 日志内容
     **/
    String value() default "";

    /**
     * 日志类型
     *
     * @return 0:操作日志;1:登录日志;2:定时任务;
     */
    LogType logType() default LogType.OPERATE;

    /**
     * 操作日志类型
     *
     * @return （1查询，2添加，3修改，4删除）
     */
    OperateType operateType() default OperateType.LIST;
}

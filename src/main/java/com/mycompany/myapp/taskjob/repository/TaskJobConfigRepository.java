package com.mycompany.myapp.taskjob.repository;

import com.mycompany.myapp.taskjob.domain.TaskJobConfig;
import com.mycompany.myapp.taskjob.repository.base.TaskJobConfigBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TaskJobConfigRepository extends TaskJobConfigBaseRepository<TaskJobConfig> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

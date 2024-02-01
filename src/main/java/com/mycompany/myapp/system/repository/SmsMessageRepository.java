package com.mycompany.myapp.system.repository;

import com.mycompany.myapp.system.domain.SmsMessage;
import com.mycompany.myapp.system.repository.base.SmsMessageBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SmsMessageRepository extends SmsMessageBaseRepository<SmsMessage> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

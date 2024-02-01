package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UploadImage;
import com.mycompany.myapp.repository.base.UploadImageBaseRepository;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UploadImageRepository extends UploadImageBaseRepository<UploadImage> {
    // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！
}

package com.mycompany.myapp.repository.timezone;

import com.diboot.core.mapper.BaseCrudMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * Spring Data JPA repository for the {@link DateTimeWrapper} entity.
 */
@Mapper
public interface DateTimeWrapperRepository extends BaseCrudMapper<DateTimeWrapper> {}

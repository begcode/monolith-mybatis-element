package com.mycompany.myapp.settings.service;

import static com.diboot.core.binding.QueryBuilder.criteriaToWrapper;
import static com.diboot.core.binding.QueryBuilder.criteriaToWrapperNoJoin;
import static tech.jhipster.service.mybatis.AggregateUtil.buildAggregate;
import static tech.jhipster.service.mybatis.AggregateUtil.buildGroupBy;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.*;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.diboot.core.binding.Binder;
import com.diboot.core.binding.query.dynamic.DynamicJoinQueryWrapper;
import com.mycompany.myapp.settings.domain.CommonFieldData;
import com.mycompany.myapp.settings.repository.CommonFieldDataRepository;
import com.mycompany.myapp.settings.service.criteria.CommonFieldDataCriteria;
import com.mycompany.myapp.settings.service.dto.CommonFieldDataDTO;
import com.mycompany.myapp.settings.service.mapper.CommonFieldDataMapper;
import java.util.*;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import tech.jhipster.service.aggregate.*;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.RangeFilter;
import tech.jhipster.service.filter.StringFilter;
import tech.jhipster.service.mybatis.CriteriaUtil;
import tech.jhipster.service.mybatis.QueryService;

/**
 * 用于对数据库中的{@link CommonFieldData}实体执行复杂查询的Service。
 * 主要输入是一个{@link CommonFieldDataCriteria}，它被转换为{@link QueryWrapper}，
 * 所有字段过滤器都将应用到表达式中。
 * 它返回满足条件的{@link CommonFieldDataDTO}列表{@link List} 或 {@link CommonFieldDataDTO} 的分页列表 {@link Page}。
 */
@Service
public class CommonFieldDataQueryService implements QueryService<CommonFieldData> {

    private final Logger log = LoggerFactory.getLogger(CommonFieldDataQueryService.class);

    protected final CommonFieldDataRepository commonFieldDataRepository;

    protected final CommonFieldDataMapper commonFieldDataMapper;

    public CommonFieldDataQueryService(CommonFieldDataRepository commonFieldDataRepository, CommonFieldDataMapper commonFieldDataMapper) {
        this.commonFieldDataRepository = commonFieldDataRepository;
        this.commonFieldDataMapper = commonFieldDataMapper;
    }

    /**
     * Return a {@link List} of {@link CommonFieldDataDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */

    public List<CommonFieldDataDTO> findByCriteria(CommonFieldDataCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final QueryWrapper<CommonFieldData> queryWrapper = createQueryWrapper(criteria);
        return commonFieldDataMapper.toDto(Binder.joinQueryList(queryWrapper, CommonFieldData.class));
    }

    /**
     * Return a {@link IPage} of {@link CommonFieldDataDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */

    public IPage<CommonFieldDataDTO> findByCriteria(CommonFieldDataCriteria criteria, Page<CommonFieldData> page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final QueryWrapper<CommonFieldData> queryWrapper = createQueryWrapper(criteria);
        return Binder.joinQueryPage(queryWrapper, CommonFieldData.class, page).convert(commonFieldData -> {
            Binder.bindRelations(commonFieldData, new String[] {});
            return commonFieldDataMapper.toDto(commonFieldData);
        });
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */

    public long countByCriteria(CommonFieldDataCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        return commonFieldDataRepository.selectCount(createQueryWrapperNoJoin(criteria));
    }

    public <T> List<T> getFieldByCriteria(Class<T> clazz, String fieldName, Boolean distinct, CommonFieldDataCriteria criteria) {
        return (List<T>) commonFieldDataRepository.selectObjs(createQueryWrapperNoJoin(criteria).select(fieldName));
    }

    public long countByFieldNameAndCriteria(String fieldName, Boolean distinct, CommonFieldDataCriteria criteria) {
        return commonFieldDataRepository.selectCount(createQueryWrapperNoJoin(criteria));
    }

    /**
     * Function to convert {@link CommonFieldDataCriteria} to a {@link QueryWrapper}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link QueryWrapper} of the entity.
     */
    public QueryWrapper<CommonFieldData> createQueryWrapper(CommonFieldDataCriteria criteria) {
        if (StringUtils.isNotEmpty(criteria.getJhiCommonSearchKeywords())) {
            String keywords = criteria.getJhiCommonSearchKeywords();
            criteria.setJhiCommonSearchKeywords(null);
            CommonFieldDataCriteria keywordsCriteria = new CommonFieldDataCriteria();
            keywordsCriteria.setUseOr(true);
            if (StringUtils.isNumeric(keywords)) {
                keywordsCriteria.id().setEquals(Long.valueOf(keywords));
                keywordsCriteria.sortValue().setEquals(Integer.valueOf(keywords));
                keywordsCriteria.ownerEntityId().setEquals(Long.valueOf(keywords));
            }
            keywordsCriteria.name().setContains(keywords);
            keywordsCriteria.value().setContains(keywords);
            keywordsCriteria.label().setContains(keywords);
            keywordsCriteria.remark().setContains(keywords);
            keywordsCriteria.ownerEntityName().setContains(keywords);
            CommonFieldDataCriteria tempCriteria = criteria;
            while (tempCriteria.getAnd() != null) {
                tempCriteria = tempCriteria.getAnd();
            }
            tempCriteria.setAnd(keywordsCriteria);
        }
        QueryWrapper<CommonFieldData> queryWrapper = new DynamicJoinQueryWrapper<>(CommonFieldDataCriteria.class, null);
        return createQueryWrapper(queryWrapper, criteria.getUseOr(), criteria);
    }

    /**
     * Function to convert {@link CommonFieldDataCriteria} to a {@link QueryWrapper}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link QueryWrapper} of the entity.
     */
    public QueryWrapper<CommonFieldData> createQueryWrapperNoJoin(CommonFieldDataCriteria criteria) {
        QueryWrapper<CommonFieldData> queryWrapper = new QueryWrapper<>();
        return createQueryWrapperNoJoin(queryWrapper, criteria.getUseOr(), criteria);
    }

    private QueryWrapper<CommonFieldData> createQueryWrapper(
        QueryWrapper<CommonFieldData> queryWrapper,
        Boolean useOr,
        CommonFieldDataCriteria criteria
    ) {
        if (criteria != null) {
            if (useOr == null) {
                useOr = false;
            }
            Map<QueryWrapper<CommonFieldData>, Map<String, Object>> queryWrapperMapMap = criteriaToWrapper(criteria, CommonFieldData.class);
            Map.Entry<QueryWrapper<CommonFieldData>, Map<String, Object>> queryWrapperMapEntry = queryWrapperMapMap
                .entrySet()
                .stream()
                .findFirst()
                .orElseThrow();
            Map<String, Object> fieldMap = queryWrapperMapEntry.getValue();
            if (MapUtils.isNotEmpty(fieldMap)) {
                if (queryWrapper == null) {
                    queryWrapper = queryWrapperMapEntry.getKey();
                }
                QueryWrapper<CommonFieldData> finalQueryWrapper = queryWrapper;
                Boolean finalUseOr = useOr;
                fieldMap.forEach((fieldName, filter) -> {
                    if (filter instanceof StringFilter) {
                        CriteriaUtil.build(
                            finalUseOr,
                            finalQueryWrapper,
                            buildStringSpecification((StringFilter) filter, fieldName, finalUseOr)
                        );
                    } else if (filter instanceof RangeFilter) {
                        CriteriaUtil.build(
                            finalUseOr,
                            finalQueryWrapper,
                            buildRangeSpecification((RangeFilter) filter, fieldName, finalUseOr)
                        );
                    } else if (filter instanceof Filter) {
                        CriteriaUtil.build(finalUseOr, finalQueryWrapper, buildSpecification((Filter) filter, fieldName, finalUseOr));
                    }
                });
            }
            if (criteria.getAnd() != null) {
                Map<String, Object> stringObjectMap = BeanUtil.beanToMap(criteria.getAnd(), false, true);
                if (
                    !((stringObjectMap.containsKey("useOr") && stringObjectMap.keySet().size() == 1) ||
                        ObjectUtils.isEmpty(stringObjectMap))
                ) {
                    if (queryWrapper != null) {
                        queryWrapper.and(q -> createQueryWrapper(q, criteria.getAnd().getUseOr(), criteria.getAnd()));
                    } else {
                        queryWrapper = createQueryWrapper(null, criteria.getAnd().getUseOr(), criteria.getAnd());
                    }
                }
            } else {
                if (criteria.getOr() != null) {
                    Map<String, Object> stringObjectMap = BeanUtil.beanToMap(criteria.getOr(), false, true);
                    if (
                        !((stringObjectMap.containsKey("useOr") && stringObjectMap.keySet().size() == 1) ||
                            ObjectUtils.isEmpty(stringObjectMap))
                    ) {
                        if (queryWrapper != null) {
                            queryWrapper.or(q -> createQueryWrapper(q, criteria.getOr().getUseOr(), criteria.getOr()));
                        } else {
                            queryWrapper = createQueryWrapper(null, criteria.getOr().getUseOr(), criteria.getOr());
                        }
                    }
                }
            }
        }
        return queryWrapper;
    }

    private QueryWrapper<CommonFieldData> createQueryWrapperNoJoin(
        QueryWrapper<CommonFieldData> queryWrapper,
        Boolean useOr,
        CommonFieldDataCriteria criteria
    ) {
        if (criteria != null) {
            if (useOr == null) {
                useOr = false;
            }
            Map<QueryWrapper<CommonFieldData>, Map<String, Object>> queryWrapperMapMap = criteriaToWrapperNoJoin(
                criteria,
                CommonFieldData.class
            );
            Map.Entry<QueryWrapper<CommonFieldData>, Map<String, Object>> queryWrapperMapEntry = queryWrapperMapMap
                .entrySet()
                .stream()
                .findFirst()
                .orElseThrow();
            Map<String, Object> fieldMap = queryWrapperMapEntry.getValue();
            if (MapUtils.isNotEmpty(fieldMap)) {
                if (queryWrapper == null) {
                    queryWrapper = queryWrapperMapEntry.getKey();
                }
                QueryWrapper<CommonFieldData> finalQueryWrapper = queryWrapper;
                Boolean finalUseOr = useOr;
                fieldMap.forEach((fieldName, filter) -> {
                    if (filter instanceof StringFilter) {
                        CriteriaUtil.build(
                            finalUseOr,
                            finalQueryWrapper,
                            buildStringSpecification((StringFilter) filter, fieldName, finalUseOr)
                        );
                    } else if (filter instanceof RangeFilter) {
                        CriteriaUtil.build(
                            finalUseOr,
                            finalQueryWrapper,
                            buildRangeSpecification((RangeFilter) filter, fieldName, finalUseOr)
                        );
                    } else if (filter instanceof Filter) {
                        CriteriaUtil.build(finalUseOr, finalQueryWrapper, buildSpecification((Filter) filter, fieldName, finalUseOr));
                    }
                });
            }
            if (criteria.getAnd() != null) {
                Map<String, Object> stringObjectMap = BeanUtil.beanToMap(criteria.getAnd(), false, true);
                if (
                    !((stringObjectMap.containsKey("useOr") && stringObjectMap.keySet().size() == 1) ||
                        ObjectUtils.isEmpty(stringObjectMap))
                ) {
                    if (queryWrapper != null) {
                        queryWrapper.and(q -> createQueryWrapperNoJoin(q, criteria.getAnd().getUseOr(), criteria.getAnd()));
                    } else {
                        queryWrapper = createQueryWrapperNoJoin(null, criteria.getAnd().getUseOr(), criteria.getAnd());
                    }
                }
            } else {
                if (criteria.getOr() != null) {
                    Map<String, Object> stringObjectMap = BeanUtil.beanToMap(criteria.getOr(), false, true);
                    if (
                        !((stringObjectMap.containsKey("useOr") && stringObjectMap.keySet().size() == 1) ||
                            ObjectUtils.isEmpty(stringObjectMap))
                    ) {
                        if (queryWrapper != null) {
                            queryWrapper.or(q -> createQueryWrapperNoJoin(q, criteria.getOr().getUseOr(), criteria.getOr()));
                        } else {
                            queryWrapper = createQueryWrapperNoJoin(null, criteria.getOr().getUseOr(), criteria.getOr());
                        }
                    }
                }
            }
        }
        return queryWrapper;
    }

    /**
     * Return a {@link IPage} of {@link CommonFieldDataDTO} which matches the criteria from the database.
     * @param queryWrapper The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    public IPage<CommonFieldDataDTO> findByQueryWrapper(QueryWrapper<CommonFieldData> queryWrapper, Page<CommonFieldData> page) {
        log.debug("find by criteria : {}, page: {}", queryWrapper, page);
        return commonFieldDataRepository.selectPage(page, queryWrapper).convert(commonFieldDataMapper::toDto);
    }

    public List<Map<String, Object>> statsByAggregateCriteria(CommonFieldDataCriteria criteria) {
        QueryWrapper<CommonFieldData> queryWrapper = createQueryWrapper(criteria);
        List<String> selectFields = new ArrayList<>();
        List<String> groupByFields = new ArrayList<>();
        if (criteria.getId() != null) {
            getAggregateAndGroupBy(criteria.getId(), "id", selectFields, groupByFields);
        }
        if (criteria.getName() != null) {
            getAggregateAndGroupBy(criteria.getName(), "name", selectFields, groupByFields);
        }
        if (criteria.getValue() != null) {
            getAggregateAndGroupBy(criteria.getValue(), "value", selectFields, groupByFields);
        }
        if (criteria.getLabel() != null) {
            getAggregateAndGroupBy(criteria.getLabel(), "label", selectFields, groupByFields);
        }
        if (criteria.getValueType() != null) {
            getAggregateAndGroupBy(criteria.getValueType(), "value_type", selectFields, groupByFields);
        }
        if (criteria.getRemark() != null) {
            getAggregateAndGroupBy(criteria.getRemark(), "remark", selectFields, groupByFields);
        }
        if (criteria.getSortValue() != null) {
            getAggregateAndGroupBy(criteria.getSortValue(), "sort_value", selectFields, groupByFields);
        }
        if (criteria.getDisabled() != null) {
            getAggregateAndGroupBy(criteria.getDisabled(), "disabled", selectFields, groupByFields);
        }
        if (criteria.getOwnerEntityName() != null) {
            getAggregateAndGroupBy(criteria.getOwnerEntityName(), "owner_entity_name", selectFields, groupByFields);
        }
        if (criteria.getOwnerEntityId() != null) {
            getAggregateAndGroupBy(criteria.getOwnerEntityId(), "owner_entity_id", selectFields, groupByFields);
        }
        if (CollectionUtils.isNotEmpty(selectFields)) {
            queryWrapper.select(selectFields.toArray(new String[0])).groupBy(CollectionUtils.isNotEmpty(groupByFields), groupByFields);
            return commonFieldDataRepository.selectMaps(queryWrapper);
        }
        return Collections.emptyList();
    }

    private void getAggregateAndGroupBy(Filter<?> filter, String fieldName, List<String> selects, List<String> groupBys) {
        if (filter.getAggregate() != null) {
            if (filter.getAggregate() instanceof NumberAggregate) {
                buildAggregate((NumberAggregate) filter.getAggregate(), fieldName, selects);
            } else {
                buildAggregate(filter.getAggregate(), fieldName, selects);
            }
        }
        if (filter.getGroupBy() != null) {
            if (filter.getGroupBy() instanceof DateTimeGroupBy) {
                buildGroupBy((DateTimeGroupBy) filter.getGroupBy(), fieldName, groupBys, selects);
            } else {
                buildGroupBy(filter.getGroupBy(), fieldName, groupBys, selects);
            }
        }
    }
}

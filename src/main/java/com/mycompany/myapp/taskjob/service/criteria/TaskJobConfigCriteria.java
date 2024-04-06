package com.mycompany.myapp.taskjob.service.criteria;

import com.diboot.core.binding.query.BindQuery;
import com.mycompany.myapp.domain.enumeration.JobStatus;
import java.io.Serializable;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.*;

/**
 * Criteria class for the {@link com.mycompany.myapp.taskjob.domain.TaskJobConfig} entity. This class is used
 * in {@link com.mycompany.myapp.taskjob.web.rest.TaskJobConfigResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /task-job-configs?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TaskJobConfigCriteria implements Serializable, Criteria {

    /**
     * Class for filtering JobStatus
     */
    public static class JobStatusFilter extends Filter<JobStatus> {

        public JobStatusFilter() {}

        public JobStatusFilter(JobStatusFilter filter) {
            super(filter);
        }

        @Override
        public JobStatusFilter copy() {
            return new JobStatusFilter(this);
        }
    }

    private static final long serialVersionUID = 1L;

    @BindQuery(column = "self.id")
    private LongFilter id;

    @BindQuery(column = "self.name")
    private StringFilter name;

    @BindQuery(column = "self.job_class_name")
    private StringFilter jobClassName;

    @BindQuery(column = "self.cron_expression")
    private StringFilter cronExpression;

    @BindQuery(column = "self.parameter")
    private StringFilter parameter;

    @BindQuery(column = "self.description")
    private StringFilter description;

    @BindQuery(column = "self.job_status")
    private JobStatusFilter jobStatus;

    @BindQuery(column = "self.created_by")
    private LongFilter createdBy;

    @BindQuery(column = "self.created_date")
    private InstantFilter createdDate;

    @BindQuery(column = "self.last_modified_by")
    private LongFilter lastModifiedBy;

    @BindQuery(column = "self.last_modified_date")
    private InstantFilter lastModifiedDate;

    @BindQuery(ignore = true)
    private String jhiCommonSearchKeywords;

    @BindQuery(ignore = true)
    private Boolean useOr = false;

    @BindQuery(ignore = true)
    private TaskJobConfigCriteria and;

    @BindQuery(ignore = true)
    private TaskJobConfigCriteria or;

    private Boolean distinct;

    public TaskJobConfigCriteria() {}

    public TaskJobConfigCriteria(TaskJobConfigCriteria other) {
        this.id = other.optionalId().map(LongFilter::copy).orElse(null);
        this.name = other.optionalName().map(StringFilter::copy).orElse(null);
        this.jobClassName = other.optionalJobClassName().map(StringFilter::copy).orElse(null);
        this.cronExpression = other.optionalCronExpression().map(StringFilter::copy).orElse(null);
        this.parameter = other.optionalParameter().map(StringFilter::copy).orElse(null);
        this.description = other.optionalDescription().map(StringFilter::copy).orElse(null);
        this.jobStatus = other.optionalJobStatus().map(JobStatusFilter::copy).orElse(null);
        this.createdBy = other.optionalCreatedBy().map(LongFilter::copy).orElse(null);
        this.createdDate = other.optionalCreatedDate().map(InstantFilter::copy).orElse(null);
        this.lastModifiedBy = other.optionalLastModifiedBy().map(LongFilter::copy).orElse(null);
        this.lastModifiedDate = other.optionalLastModifiedDate().map(InstantFilter::copy).orElse(null);
        this.distinct = other.distinct;
    }

    @Override
    public TaskJobConfigCriteria copy() {
        return new TaskJobConfigCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public Optional<LongFilter> optionalId() {
        return Optional.ofNullable(id);
    }

    public LongFilter id() {
        if (id == null) {
            setId(new LongFilter());
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getName() {
        return name;
    }

    public Optional<StringFilter> optionalName() {
        return Optional.ofNullable(name);
    }

    public StringFilter name() {
        if (name == null) {
            setName(new StringFilter());
        }
        return name;
    }

    public void setName(StringFilter name) {
        this.name = name;
    }

    public StringFilter getJobClassName() {
        return jobClassName;
    }

    public Optional<StringFilter> optionalJobClassName() {
        return Optional.ofNullable(jobClassName);
    }

    public StringFilter jobClassName() {
        if (jobClassName == null) {
            setJobClassName(new StringFilter());
        }
        return jobClassName;
    }

    public void setJobClassName(StringFilter jobClassName) {
        this.jobClassName = jobClassName;
    }

    public StringFilter getCronExpression() {
        return cronExpression;
    }

    public Optional<StringFilter> optionalCronExpression() {
        return Optional.ofNullable(cronExpression);
    }

    public StringFilter cronExpression() {
        if (cronExpression == null) {
            setCronExpression(new StringFilter());
        }
        return cronExpression;
    }

    public void setCronExpression(StringFilter cronExpression) {
        this.cronExpression = cronExpression;
    }

    public StringFilter getParameter() {
        return parameter;
    }

    public Optional<StringFilter> optionalParameter() {
        return Optional.ofNullable(parameter);
    }

    public StringFilter parameter() {
        if (parameter == null) {
            setParameter(new StringFilter());
        }
        return parameter;
    }

    public void setParameter(StringFilter parameter) {
        this.parameter = parameter;
    }

    public StringFilter getDescription() {
        return description;
    }

    public Optional<StringFilter> optionalDescription() {
        return Optional.ofNullable(description);
    }

    public StringFilter description() {
        if (description == null) {
            setDescription(new StringFilter());
        }
        return description;
    }

    public void setDescription(StringFilter description) {
        this.description = description;
    }

    public JobStatusFilter getJobStatus() {
        return jobStatus;
    }

    public Optional<JobStatusFilter> optionalJobStatus() {
        return Optional.ofNullable(jobStatus);
    }

    public JobStatusFilter jobStatus() {
        if (jobStatus == null) {
            setJobStatus(new JobStatusFilter());
        }
        return jobStatus;
    }

    public void setJobStatus(JobStatusFilter jobStatus) {
        this.jobStatus = jobStatus;
    }

    public LongFilter getCreatedBy() {
        return createdBy;
    }

    public Optional<LongFilter> optionalCreatedBy() {
        return Optional.ofNullable(createdBy);
    }

    public LongFilter createdBy() {
        if (createdBy == null) {
            setCreatedBy(new LongFilter());
        }
        return createdBy;
    }

    public void setCreatedBy(LongFilter createdBy) {
        this.createdBy = createdBy;
    }

    public InstantFilter getCreatedDate() {
        return createdDate;
    }

    public Optional<InstantFilter> optionalCreatedDate() {
        return Optional.ofNullable(createdDate);
    }

    public InstantFilter createdDate() {
        if (createdDate == null) {
            setCreatedDate(new InstantFilter());
        }
        return createdDate;
    }

    public void setCreatedDate(InstantFilter createdDate) {
        this.createdDate = createdDate;
    }

    public LongFilter getLastModifiedBy() {
        return lastModifiedBy;
    }

    public Optional<LongFilter> optionalLastModifiedBy() {
        return Optional.ofNullable(lastModifiedBy);
    }

    public LongFilter lastModifiedBy() {
        if (lastModifiedBy == null) {
            setLastModifiedBy(new LongFilter());
        }
        return lastModifiedBy;
    }

    public void setLastModifiedBy(LongFilter lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public InstantFilter getLastModifiedDate() {
        return lastModifiedDate;
    }

    public Optional<InstantFilter> optionalLastModifiedDate() {
        return Optional.ofNullable(lastModifiedDate);
    }

    public InstantFilter lastModifiedDate() {
        if (lastModifiedDate == null) {
            setLastModifiedDate(new InstantFilter());
        }
        return lastModifiedDate;
    }

    public void setLastModifiedDate(InstantFilter lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public void setAnd(TaskJobConfigCriteria and) {
        this.and = and;
    }

    public TaskJobConfigCriteria getAnd() {
        return and;
    }

    public TaskJobConfigCriteria and() {
        if (and == null) {
            and = new TaskJobConfigCriteria();
        }
        return and;
    }

    public void setOr(TaskJobConfigCriteria or) {
        this.or = or;
    }

    public TaskJobConfigCriteria getOr() {
        return or;
    }

    public TaskJobConfigCriteria or() {
        if (or == null) {
            or = new TaskJobConfigCriteria();
        }
        return or;
    }

    public String getJhiCommonSearchKeywords() {
        return jhiCommonSearchKeywords;
    }

    public void setJhiCommonSearchKeywords(String jhiCommonSearchKeywords) {
        this.jhiCommonSearchKeywords = jhiCommonSearchKeywords;
    }

    public Boolean getUseOr() {
        return useOr;
    }

    public void setUseOr(Boolean useOr) {
        this.useOr = useOr;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public Optional<Boolean> optionalDistinct() {
        return Optional.ofNullable(distinct);
    }

    public Boolean distinct() {
        if (distinct == null) {
            setDistinct(true);
        }
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final TaskJobConfigCriteria that = (TaskJobConfigCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(name, that.name) &&
            Objects.equals(jobClassName, that.jobClassName) &&
            Objects.equals(cronExpression, that.cronExpression) &&
            Objects.equals(parameter, that.parameter) &&
            Objects.equals(description, that.description) &&
            Objects.equals(jobStatus, that.jobStatus) &&
            Objects.equals(createdBy, that.createdBy) &&
            Objects.equals(createdDate, that.createdDate) &&
            Objects.equals(lastModifiedBy, that.lastModifiedBy) &&
            Objects.equals(lastModifiedDate, that.lastModifiedDate) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            name,
            jobClassName,
            cronExpression,
            parameter,
            description,
            jobStatus,
            createdBy,
            createdDate,
            lastModifiedBy,
            lastModifiedDate,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TaskJobConfigCriteria{" +
            optionalId().map(f -> "id=" + f + ", ").orElse("") +
            optionalName().map(f -> "name=" + f + ", ").orElse("") +
            optionalJobClassName().map(f -> "jobClassName=" + f + ", ").orElse("") +
            optionalCronExpression().map(f -> "cronExpression=" + f + ", ").orElse("") +
            optionalParameter().map(f -> "parameter=" + f + ", ").orElse("") +
            optionalDescription().map(f -> "description=" + f + ", ").orElse("") +
            optionalJobStatus().map(f -> "jobStatus=" + f + ", ").orElse("") +
            optionalCreatedBy().map(f -> "createdBy=" + f + ", ").orElse("") +
            optionalCreatedDate().map(f -> "createdDate=" + f + ", ").orElse("") +
            optionalLastModifiedBy().map(f -> "lastModifiedBy=" + f + ", ").orElse("") +
            optionalLastModifiedDate().map(f -> "lastModifiedDate=" + f + ", ").orElse("") +
            (jhiCommonSearchKeywords != null ? "jhiCommonSearchKeywords=" + jhiCommonSearchKeywords + ", " : "") +
            "useOr=" + useOr +
            (and != null ? "and=" + and + ", " : "") +
            (or != null ? "or=" + or + ", " : "") +
            optionalDistinct().map(f -> "distinct=" + f + ", ").orElse("") +
        "}";
    }
}

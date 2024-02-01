<template>
  <ElFormItem
    label-width="120px"
    :labelCol="{ md: field.hideLabel ? 1 : field.labelSpan || 8, xs: field.hideLabel ? 0 : 24 }"
    :wrapperCol="{ md: 24 - (field.hideLabel ? 1 : field.labelSpan || 8), xs: 24 }"
    :labelAlign="field.labelAlign || 'right'"
    style="width: 100%"
  >
    <template #label @click="changeFieldValue">
      <ElBadge v-if="config.showBadge">
        <template #count v-if="showBadge">
          <Icon icon="ant-design:check-circle-outlined" style="color: #f5222d" />
        </template>
        <span>{{ field.title }}</span>
      </ElBadge>
      <span v-else-if="!field.hideLabel">{{ field.title }}</span>
    </template>
    <el-row :gutter="8" style="width: 100%">
      <ElCol :md="field.labelSpan || 8" v-if="field.showFieldNames && field.showFieldComponent === 'Select'">
        <ElSelect :dropdownMatchSelectWidth="false" :showArrow="true" placeholder="字段选择" v-model="field.defaultFieldName">
          <ElOption :value="operator.value" v-for="(operator, operatorIndex) in field.fieldNames" :key="operatorIndex">
            {{ operator.title }}
          </ElOption>
        </ElSelect>
      </ElCol>
      <ElCol :md="field.showFieldNamesSpan || 8" v-if="field.showFieldNames && field.showFieldComponent === 'CheckGroup'">
        <ElCheckboxGroup v-model="field.defaultFieldName" :options="field.fieldNames" />
      </ElCol>
      <ElCol :md="8" v-if="field.showOperator">
        <ElSelect
          :dropdownMatchSelectWidth="false"
          :showArrow="false"
          placeholder="匹配规则"
          :value="field.operator"
          @change="val => handleSelected(val, field)"
        >
          <ElOption :value="operator.value" v-for="(operator, operatorIndex) in operatorByType(field.type)" :key="operatorIndex"
            >{{ operator.title }}
          </ElOption>
        </ElSelect>
      </ElCol>
      <ElCol :md="field.showOperator || field.showFieldNames ? 24 - (field.showFieldNamesSpan || 8) : 24">
        <ElDatePicker
          v-bind="componentProps"
          v-if="['Date', 'DateTime', 'DateRange', 'DateTimeRange', 'WeekRange', 'MonthRange', 'YearRange'].includes(field.componentType)"
          v-model="field.value"
          :placeholder="componentProps?.placeholder || '请选择时间'"
          :show-time="true"
          :format="getDateProps(field.componentType).format"
          :type="getDateProps(field.componentType).type"
          :value-format="getDateProps(field.componentType)['value-format']"
          style="width: 100%"
        />
        <ElTimePicker
          v-bind="componentProps"
          v-else-if="['Time', 'TimeRange'].includes(field.componentType)"
          v-model="field.value"
          :format="getDateProps(field.componentType).format"
          :type="getDateProps(field.componentType).type"
          :value-format="getDateProps(field.componentType)['value-format']"
          :placeholder="componentProps?.placeholder || '请选择时间'"
          style="width: 100%"
          @change="(time, value) => (field.value = value)"
        />
        <ElTimeSelect
          v-bind="componentProps"
          v-else-if="['TimeSelect'].includes(field.componentType)"
          v-model="field.value"
          :format="getDateProps(field.componentType).format"
          :type="getDateProps(field.componentType).type"
          :value-format="getDateProps(field.componentType)['value-format']"
          :placeholder="componentProps?.placeholder || '请选择时间'"
          style="width: 100%"
          @change="(time, value) => (field.value = value)"
        />
        <ElInputNumber
          v-bind="componentProps"
          v-else-if="field.componentType === 'Number'"
          style="width: 100%"
          :placeholder="componentProps?.placeholder || '请输入数值'"
          v-model="field.value"
        />
        <ElSwitch v-bind="componentProps" v-model="field.value" v-else-if="field.componentType === 'Switch'">
          <Icon icon="ant-design:check-outlined" slot="checkedChildren" />
          <Icon icon="ant-design:close-outlined" slot="unCheckedChildren" />
        </ElSwitch>
        <ElRadioGroup v-bind="componentProps" v-model="field.value" v-else-if="field.componentType === 'RadioGroup'"> </ElRadioGroup>
        <ElSelect
          v-bind="componentProps"
          v-else-if="field.componentType === 'Select'"
          :placeholder="componentProps?.placeholder || '请选择'"
          v-model="field.value"
          allowClear
        >
          <ElOption v-for="(item, index) in componentProps.options || []" :value="item.value" :key="index">
            {{ item.label }}
          </ElOption>
        </ElSelect>
        <ElSelect
          v-bind="componentProps"
          v-else-if="field.componentType === 'TagsInput'"
          mode="tags"
          v-model="field.value"
          style="width: 100%"
          :placeholder="componentProps?.placeholder || '请输入值并回车'"
        />
        <ElInput
          v-bind="componentProps"
          v-else
          v-model="field.value"
          :placeholder="componentProps?.placeholder || '请输入'"
          allowClear
          style="width: 100%"
        />
      </ElCol>
    </el-row>
  </ElFormItem>
</template>
<script lang="ts" setup>
import {
  ElRow,
  ElCol,
  ElFormItem,
  ElSwitch,
  ElMessage,
  ElInput,
  ElSelect,
  ElRadioGroup,
  ElInputNumber,
  ElTimeSelect,
  ElTimePicker,
  ElDatePicker,
  ElOption,
  ElCheckboxGroup,
  ElBadge,
} from 'element-plus';
import TypeOperator from './filter-operator';
import { Icon } from '@/components/Icon';
import { isFunction } from '@/utils/is';
import { computed, onMounted } from 'vue';

defineOptions({
  name: 'SearchFormItem',
  inheritAttrs: false,
});

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  config: {
    type: Object,
    default: () => {
      return {
        showBadge: false,
      };
    },
  },
});

const showBadge = computed(() => {
  return (
    (props.field.value !== null && props.field.value !== undefined && props.field.value !== '') ||
    (Array.prototype.isPrototypeOf(props.field.value) && props.field.value.length !== 0)
  );
});

const componentProps = computed(() => {
  if (isFunction(props.field.componentProps)) {
    return props.field.componentProps();
  } else {
    return props.field.componentProps;
  }
});

const getDateProps = type => {
  const result = {
    type: 'date',
    format: 'yyyy-MM-dd',
    'value-format': 'yyyy-MM-dd',
  };
  switch (type) {
    case 'DateTime':
      result.type = 'datetime';
      result.format = 'yyyy-MM-dd HH:mm:ss';
      result['value-format'] = 'yyyy-MM-dd HH:mm:ss';
      break;
    case 'Time':
      result.type = 'time';
      result.format = 'HH:mm:ss';
      result['value-format'] = 'HH:mm:ss';
      break;
    case 'DateRange':
      result.type = 'daterange';
      result.format = 'yyyy-MM-dd';
      result['value-format'] = 'yyyy-MM-dd';
      break;
    case 'DateTimeRange':
      result.type = 'datetimerange';
      result.format = 'yyyy-MM-dd HH:mm:ss';
      result['value-format'] = 'yyyy-MM-dd HH:mm:ss';
      break;
    case 'WeekRange':
      result.type = 'week';
      result.format = 'yyyy 第 WW 周';
      result['value-format'] = 'yyyy 第 WW 周';
      break;
    case 'MonthRange':
      result.type = 'month';
      result.format = 'yyyy-MM';
      result['value-format'] = 'yyyy-MM';
      break;
    case 'YearRange':
      result.type = 'year';
      result.format = 'yyyy';
      result['value-format'] = 'yyyy';
      break;
    case 'TimeRange':
      result.type = 'timerange';
      result.format = 'HH:mm:ss';
      result['value-format'] = 'HH:mm:ss';
      break;
    case 'Month':
      result.type = 'month';
      result.format = 'yyyy-MM';
      result['value-format'] = 'yyyy-MM';
      break;
    case 'Year':
      result.type = 'year';
      result.format = 'yyyy';
      result['value-format'] = 'yyyy';
      break;
    case 'Date':
    default:
      result.type = 'date';
      result.format = 'yyyy-MM-dd';
      result['value-format'] = 'yyyy-MM-dd';
      break;
  }
  return result;
};

const operatorByType = type => {
  switch (type) {
    case 'Boolean':
    case 'Enum':
    case 'UUID':
      return TypeOperator.common;
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'LocalDate':
    case 'BigDecimal':
      return TypeOperator.range;
    case 'ZonedDateTime':
      return TypeOperator.dateTime;
    case 'String':
      return TypeOperator.text;
    case 'RelationId':
      return TypeOperator.range;
    default:
      return TypeOperator.null;
  }
};

const handleSelectField = (_fieldName, field) => {
  if (field.componentType === 'Select') {
    field.componentProps = {
      ...field.componentProps,
      options: field.options,
    };
  }
};

const handleSelected = (operator: string, field: any) => {
  switch (field.type) {
    case 'Boolean':
      field.componentType = 'Switch';
      if (operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'CheckBox';
        field.value = [];
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
      }
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    case 'Enum':
      field.componentType = 'Select';
      field.props = { multiple: false };
      if (operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'Select';
        field.props = { multiple: true };
        field.value = [];
      }
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    case 'UUID':
    case 'String':
      field.componentType = 'Text';
      if (operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'TagsInput';
        field.value = [];
      }
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
      field.componentType = 'Number';
      if (operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'TagsInput';
        field.value = [];
      }
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    case 'LocalDate':
    case 'Date':
      field.componentType = 'Date';
      if (operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'TagsInput';
        field.value = [];
        field.props = { type: 'Date' };
      }
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    case 'ZonedDateTime':
    case 'Instant':
    case 'Duration':
      field.componentType = 'DateTime';
      field.value = null;
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    case 'Blob':
    case 'AnyBlob':
    case 'ImageBlob':
    case 'TextBlob':
    case 'ByteBuffer':
      field.componentType = null;
      field.value = null;
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    case 'RelationId':
      field.componentType = 'SelectListModal';
      if (operator === 'in') {
        field.componentType = 'SelectListModal';
        field.props = { multiple: true };
        field.value = [];
      }
      if (operator === 'specified') {
        field.componentType = 'Switch';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = null;
      }
      break;
    default:
      field.componentType = null;
  }
  field.operator = operator;
};

const componentByField = field => {
  switch (field.type) {
    case 'Boolean':
      field.componentType = 'Switch';
      if (field.operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'CheckBox';
        field.options = [
          { label: '是', value: true },
          { label: '否', value: false },
        ];
        field.value = [];
      }
      break;
    case 'Enum':
      field.componentType = 'Select';
      field.props = { multiple: false };
      if (field.operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'Select';
        field.props = { multiple: true };
      }
      break;
    case 'UUID':
    case 'String':
      field.componentType = 'Text';
      if (field.operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'TagsInput';
        field.value = [];
      }
      break;
    case 'Integer':
    case 'Long':
    case 'Float':
    case 'Double':
    case 'BigDecimal':
      field.componentType = 'Number';
      if (field.operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'TagsInput';
        field.value = [];
      }
      break;
    case 'LocalDate':
    case 'Date':
      field.componentType = 'Date';
      if (field.operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'TagsInput';
        field.value = [];
        field.props = { type: 'Date' };
      }
      break;
    case 'ZonedDateTime':
    case 'Instant':
    case 'Duration':
      field.componentType = 'DateTime';
      break;
    case 'Blob':
    case 'AnyBlob':
    case 'ImageBlob':
    case 'TextBlob':
    case 'ByteBuffer':
      field.componentType = null;
      break;
    case 'RelationId':
      if (field.operator === 'in' || field.operator === 'notIn') {
        field.componentType = 'SelectListModal';
        field.props = { multiple: true };
      }
      field.componentType = 'SelectListModal';
      break;
    default:
      field.componentType = null;
  }
};

const changeFieldValue = () => {
  if (!props.config?.showBadge) {
    return;
  }
  if (
    props.field.value !== null &&
    props.field.value !== undefined &&
    props.field.value !== '' &&
    !(props.field.value instanceof Array && props.field.value.length)
  ) {
    switch (props.field.componentType) {
      case 'TagsInput':
        props.field.value = [];
        break;
      default:
        props.field.value = null;
    }
    componentByField(props.field);
    ElMessage({
      message: '过滤条件已经清除！',
      type: 'info',
      duration: 3 * 1000,
    });
  }
};

onMounted(() => {
  if (!props.field.componentType) {
    componentByField(props.field);
  }
});
</script>
<style lang="css" scoped>
.el-select .el-input {
  width: 100%;
}
</style>

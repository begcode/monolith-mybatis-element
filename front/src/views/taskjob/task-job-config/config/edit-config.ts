import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const taskJobConfigService = apiService.taskjob.taskJobConfigService;
const relationshipApis: any = {};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
  const { getEnumDict } = useI18n();
  const relationshipApiData: any = {};
  return [
    {
      label: 'ID',
      field: 'id',
      hidden: values => {
        return !values || !values.id;
      },
      component: 'InputNumber',
      componentProps: { placeholder: '请输入ID', controls: false, readonly: true, style: 'width: 100%' },
    },
    {
      label: '任务名称',
      field: 'name',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入任务名称', style: 'width: 100%' },
    },
    {
      label: '任务类名',
      field: 'jobClassName',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入任务类名', style: 'width: 100%' },
    },
    {
      label: 'cron表达式',
      field: 'cronExpression',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入cron表达式', style: 'width: 100%' },
    },
    {
      label: '参数',
      field: 'parameter',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入参数', style: 'width: 100%' },
    },
    {
      label: '描述',
      field: 'description',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入描述', style: 'width: 100%' },
    },
    {
      label: '任务状态',
      field: 'jobStatus',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择任务状态', options: getEnumDict('JobStatus'), style: 'width: 100%' };
      },
    },
    {
      label: '创建者Id',
      field: 'createdBy',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入创建者Id', controls: false, style: 'width: 100%' },
    },
    {
      label: '创建时间',
      field: 'createdDate',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入创建时间', style: 'width: 100%' },
    },
    {
      label: '修改者Id',
      field: 'lastModifiedBy',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入修改者Id', controls: false, style: 'width: 100%' },
    },
    {
      label: '修改时间',
      field: 'lastModifiedDate',
      hidden: true,
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入修改时间', style: 'width: 100%' },
    },
  ];
};
const rules = (): any => ({});
export default {
  fields,
  rules,
};

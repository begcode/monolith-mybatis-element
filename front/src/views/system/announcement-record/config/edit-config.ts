import { FormSchema } from '@begcode/components';
import apiService from '@/api/index';

const announcementRecordService = apiService.system.announcementRecordService;
const relationshipApis: any = {};

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

const fields = (): FormSchema[] => {
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
      label: '通告ID',
      field: 'anntId',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入通告ID', controls: false, style: 'width: 100%' },
    },
    {
      label: '用户id',
      field: 'userId',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入用户id', controls: false, style: 'width: 100%' },
    },
    {
      label: '是否已读',
      field: 'hasRead',
      component: 'Switch',
      componentProps: { placeholder: '请选择是否已读' },
    },
    {
      label: '阅读时间',
      field: 'readTime',
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择阅读时间', style: 'width: 100%' },
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

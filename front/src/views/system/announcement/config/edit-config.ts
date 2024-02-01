import { FormSchema } from '@begcode/components';
import { useI18n } from '@/hooks/web/useI18n';
import apiService from '@/api/index';

const announcementService = apiService.system.announcementService;
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
      label: '标题',
      field: 'title',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入标题', style: 'width: 100%' },
    },
    {
      label: '摘要',
      field: 'summary',
      component: 'Input',
      componentProps: { placeholder: '请输入摘要', type: 'textarea', style: 'width: 100%' },
    },
    {
      label: '内容',
      field: 'content',
      component: 'Editor',
      componentProps: { placeholder: '请输入内容', style: 'width: 100%' },
    },
    {
      label: '开始时间',
      field: 'startTime',
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择开始时间', style: 'width: 100%' },
    },
    {
      label: '结束时间',
      field: 'endTime',
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择结束时间', style: 'width: 100%' },
    },
    {
      label: '发布人Id',
      field: 'senderId',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入发布人Id', controls: false, style: 'width: 100%' },
    },
    {
      label: '优先级',
      field: 'priority',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择优先级', options: getEnumDict('PriorityLevel'), style: 'width: 100%' };
      },
    },
    {
      label: '消息类型',
      field: 'category',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择消息类型', options: getEnumDict('AnnoCategory'), style: 'width: 100%' };
      },
    },
    {
      label: '通告对象类型',
      field: 'receiverType',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择通告对象类型', options: getEnumDict('ReceiverType'), style: 'width: 100%' };
      },
    },
    {
      label: '发布状态',
      field: 'sendStatus',
      hidden: true,
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择发布状态', options: getEnumDict('AnnoSendStatus'), style: 'width: 100%' };
      },
    },
    {
      label: '发布时间',
      field: 'sendTime',
      hidden: true,
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择发布时间', style: 'width: 100%' },
    },
    {
      label: '撤销时间',
      field: 'cancelTime',
      hidden: true,
      component: 'DatePicker',
      componentProps: { valueFormat: 'YYYY-MM-DD hh:mm:ss', placeholder: '请选择撤销时间', style: 'width: 100%' },
    },
    {
      label: '业务类型',
      field: 'businessType',
      hidden: true,
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择业务类型', options: getEnumDict('AnnoBusinessType'), style: 'width: 100%' };
      },
    },
    {
      label: '业务id',
      field: 'businessId',
      hidden: true,
      component: 'InputNumber',
      componentProps: { placeholder: '请输入业务id', controls: false, style: 'width: 100%' },
    },
    {
      label: '打开方式',
      field: 'openType',
      component: 'Select',
      componentProps: () => {
        const { getEnumDict } = useI18n();
        return { placeholder: '请选择打开方式', options: getEnumDict('AnnoOpenType'), style: 'width: 100%' };
      },
    },
    {
      label: '组件/路由 地址',
      field: 'openPage',
      component: 'Input',
      componentProps: { type: 'text', clearable: true, placeholder: '请输入组件/路由 地址', style: 'width: 100%' },
    },
    {
      label: '指定接收者id',
      field: 'receiverIds',
      hidden: values => {
        return !(values && values.receiverType !== 'ALL');
      },
      component: 'SelectModal',
      componentProps: ({ formModelRef }) => {
        let componentName = '';
        if (formModelRef.value.receiverType === 'USER') {
          componentName = 'UserRelation';
        } else if (formModelRef.value.receiverType === 'DEPARTMENT') {
          componentName = 'DepartmentRelation';
        } else if (formModelRef.value.receiverType === 'POSITION') {
          componentName = 'PositionRelation';
        } else if (formModelRef.value.receiverType === 'AUTHORITY') {
          componentName = 'AuthorityRelation';
        }
        return {
          placeholder: '请选择指定接收者id',
          style: 'width: 100%',
          componentName,
          updateType: 'emitSelected',
          showComponentName: 'Avatar',
          queryNames: ['id.in'],
          rowIdField: 'value.id',
          valueType: 'splitString',
        };
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
const rules = (): any => ({
  title: [{ required: true, message: '必填项' }],
  receiverType: [{ required: true, message: '必填项' }],
});
export default {
  fields,
  rules,
};

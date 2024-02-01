import { TableColumnOptions } from '/#/table-column';
import { CommonFieldType } from '@/models/enumerations/common-field-type.model';
import { FixedType } from '@/models/enumerations/fixed-type.model';
import { ICommonTable } from '@/models/modelConfig/common-table.model';
import { RelationshipType } from '@/models/enumerations/relationship-type.model';

function transformToFilterTree(record, relationship) {
  const result: any[] = [];
  const filterItem: any = {};
  filterItem.title = relationship.name;
  filterItem.key = relationship.relationshipName;
  filterItem.value = relationship.relationshipName;
  filterItem.type = 'filterGroup';
  filterItem.children = [];
  record.forEach(recordItem => {
    const filterSubItem: any = {};
    filterSubItem.filterName = relationship.relationshipName;
    filterSubItem.filterValue = recordItem.id;
    filterSubItem.title = recordItem[relationship.otherEntityField];
    filterSubItem.type = 'filterItem';
    filterSubItem.key = relationship.relationshipName + recordItem.id;
    filterSubItem.value = `${relationship.relationshipName}${recordItem.id}`;
    filterSubItem.record = recordItem;
    if (recordItem.children) {
      filterSubItem.children = transformToFilterTree(recordItem.children, relationship);
    }
    result.push(filterSubItem);
  });
  return result;
}

export function xGenerateTableColumns(commonTableData: ICommonTable | undefined, noRecordAction?: boolean) {
  const result: any[] = [];
  // 增加一个checkbox或radio列　// todo 不确定树形结构
  result.push({ type: commonTableData?.treeTable ? 'radio' : 'checkbox', width: 60 });
  const fields = commonTableData?.commonTableFields?.filter(field => !field.hideInList) ?? [];
  fields.forEach(field => {
    const column: TableColumnOptions = {
      title: field.title,
      field: (field.system ? '' : 'extData.') + field.entityFieldName,
      minWidth: field.columnWidth,
    };
    if (field.treeIndicator) {
      column.treeNode = true;
    }
    if (field.fixed === FixedType.LEFT) {
      column.fixed = 'left';
    } else if (field.fixed === FixedType.RIGHT) {
      column.fixed = 'right';
    }
    if (field.sortable) {
      column.sortable = true;
    }
    switch (field.type) {
      case CommonFieldType.LOCATE_DATE:
        column.params = { type: 'LOCATE_DATE' };
        if (field.editInList) {
          column.editRender = {
            name: 'ADatePicker',
            props: {
              type: 'date',
              format: 'YYYY-MM-DD',
            },
          };
        }
        if (field.enableFilter) {
          column.filters = [{ data: [] }];
          column.filterRender = { name: 'AARangePicker' };
        }
        result.push(column);
        break;
      case CommonFieldType.ZONED_DATE_TIME:
        column.params = { type: 'ZONED_DATE_TIME' };
        if (field.editInList) {
          column.editRender = {
            name: 'ADatePicker',
            props: {
              type: 'date',
              format: 'YYYY-MM-DD hh:mm:ss',
            },
          };
        }
        if (field.enableFilter) {
          column.filters = [{ data: [] }];
          column.filterRender = { name: 'AARangePicker' };
        }
        result.push(column);
        break;
      case CommonFieldType.ENUM:
        column.params = { type: 'ENUM' };
        const fieldValuesObject = JSON.parse(field.fieldValues);
        const filters: any[] = [];
        Object.keys(fieldValuesObject).forEach(key => {
          filters.push({ label: fieldValuesObject[key], value: key });
        });
        if (field.enableFilter) {
          column.filters = filters;
        }
        if (field.editInList) {
          column.editRender = {
            name: 'ASelect',
            props: {
              style: {
                width: '100%',
              },
            },
            options: filters,
          };
        }
        result.push(column);
        break;
      case CommonFieldType.DOUBLE:
        column.params = { type: 'DOUBLE' };
        if (field.editInList) {
          column.editRender = {
            name: 'AInputNumber',
          };
        }
        if (field.enableFilter) {
          column.filters = [{ data: [0, 100] }];
          column.filterRender = { name: 'ASlider', props: { range: true, marks: { 0: '0', 100: '100' } } };
        }
        result.push(column);
        break;
      case CommonFieldType.FLOAT:
        column.params = { type: 'FLOAT' };
        if (field.editInList) {
          column.editRender = {
            name: 'AInputNumber',
          };
        }
        if (field.enableFilter) {
          column.filters = [{ data: [0, 100] }];
          column.filterRender = { name: 'ASlider', props: { range: true, marks: { 0: '0', 100: '100' } } };
        }
        result.push(column);
        break;
      case CommonFieldType.INTEGER:
        column.params = { type: 'INTEGER' };
        if (field.editInList) {
          column.editRender = {
            name: 'AInputNumber',
          };
        }
        if (field.enableFilter) {
          column.filters = [{ data: [0, 100] }];
          column.filterRender = { name: 'ASlider', props: { range: true, marks: { 0: '0', 100: '100' } } };
        }
        result.push(column);
        break;
      case CommonFieldType.LONG:
        column.params = { type: 'LONG' };
        if (field.editInList) {
          column.editRender = {
            name: 'AInputNumber',
          };
        }
        if (field.enableFilter) {
          column.filters = [{ data: [0, 100] }];
          column.filterRender = { name: 'ASlider', props: { range: true, marks: { 0: '0', 100: '100' } } };
        }
        result.push(column);
        break;
      case CommonFieldType.STRING:
        column.params = { type: 'STRING' };
        if (field.editInList) {
          column.editRender = {
            name: 'AInput',
          };
        }
        if (field.endUsed && field.endUsed.valueOf() === 'AVATAR') {
          column.cellRender = {
            name: 'AAvatar',
          };
        }
        if (field.endUsed && field.endUsed.valueOf() === 'ICON_PICKER') {
          column.cellRender = {
            name: 'AIcon',
          };
        }
        if (field.enableFilter) {
          column.filters = [{ data: '' }];
          column.filterRender = { name: 'AInput', props: { placeholder: '请输入包含字符' } };
        }
        result.push(column);
        break;
      case CommonFieldType.BOOLEAN:
        column.params = { type: 'BOOLEAN' };
        if (!field.editInList) {
          column.cellRender = {
            name: 'ASwitch',
            props: {
              disabled: 'disabled',
            },
          };
        } else {
          column.editRender = {
            name: 'ASwitch',
          };
        }
        if (field.enableFilter) {
          if (field.fieldValues) {
            const fieldValuesObject = JSON.parse(field.fieldValues);
            const filterArray: any[] = [];
            Object.keys(fieldValuesObject).forEach(key => {
              filterArray.push({ label: fieldValuesObject[key], value: key });
            });
            column.filters = filterArray;
          } else {
            column.filters = [
              { label: '是', value: true },
              { label: '否', value: false },
            ];
          }
        }
        result.push(column);
    }
  });
  const relationships = commonTableData?.relationships?.filter(relationship => !relationship.hideInList) ?? [];
  relationships.forEach(relationship => {
    const column: TableColumnOptions = {
      minWidth: relationship.columnWidth,
      title: relationship.name,
      // key: relationship.relationshipName,
    };
    switch (relationship.relationshipType) {
      case RelationshipType.MANY_TO_ONE:
        if (relationship.editInList) {
          column.field = (relationship.system ? '' : 'extData.') + relationship.relationshipName + '.id';
          column.editRender = {
            name: 'ASelectListModal',
            // options: relationshipsData[relationship.dataName],
            optionProps: {
              value: 'id',
              label: relationship.otherEntityField,
            },
          };
        } else {
          column.field = (relationship.system ? '' : 'extData.') + relationship.relationshipName + '.' + relationship.otherEntityField;
        }
        result.push(column);
    }
  });
  const actionColumn = {
    title: '操作',
    field: 'operation',
    fixed: 'right',
    width: commonTableData?.recordActionWidth || 140,
    slots: { default: 'recordAction' },
  };
  if (!noRecordAction) {
    result.push(actionColumn);
  }
  return result;
}

export function xGenerateSearchFormList(commonTableData: ICommonTable | undefined, relationshipApis: any) {
  const result: any[] = [];
  const fields = commonTableData?.commonTableFields?.filter(field => field.searchForm) ?? [];
  fields.forEach(field => {
    const formField: any = {};
    formField.title = field.title;
    formField.fieldName = (field.system ? '' : 'extData.') + field.entityFieldName;
    switch (field.type) {
      case CommonFieldType.LOCATE_DATE:
        formField.type = 'LocalDate';
        formField.operator = 'greaterThanOrEqual';
        formField.value = null;
        break;
      case CommonFieldType.ZONED_DATE_TIME:
        formField.type = 'ZonedDateTime';
        formField.operator = 'greaterThanOrEqual';
        formField.value = null;
        break;
      case CommonFieldType.ENUM:
        formField.type = 'Enum';
        formField.operator = 'in';
        formField.value = [];
        formField.options = [];
        const fieldValuesObject = JSON.parse(field.fieldValues);
        if (fieldValuesObject) {
          Object.keys(fieldValuesObject).forEach(key => {
            formField.options.push({ value: key, label: fieldValuesObject[key] });
          });
        }
        break;
      case CommonFieldType.DOUBLE:
        formField.type = 'Double';
        formField.operator = 'greaterThanOrEqual';
        formField.value = null;
        break;
      case CommonFieldType.FLOAT:
        formField.type = 'Float';
        formField.operator = 'greaterThanOrEqual';
        formField.value = null;
        break;
      case CommonFieldType.LONG:
      case CommonFieldType.INTEGER:
        formField.type = 'Long';
        formField.operator = 'equals';
        formField.value = null;
        break;
      case CommonFieldType.STRING:
        formField.type = 'String';
        formField.operator = 'contains';
        formField.value = null;
        break;
      case CommonFieldType.BOOLEAN:
        formField.type = 'Boolean';
        formField.operator = 'equals';
        formField.value = null;
        break;
      case CommonFieldType.IMAGEBLOB:
      case CommonFieldType.TEXTBLOB:
        formField.type = 'ImageBlob';
        formField.operator = 'specified';
        formField.value = null;
        break;
    }
    result.push(formField);
  });
  const relationships = commonTableData?.relationships?.filter(relationship => relationship.searchForm) ?? [];
  relationships.forEach(relationship => {
    switch (relationship.relationshipType) {
      case RelationshipType.MANY_TO_ONE:
        const formFieldId: any = {};
        formFieldId.type = 'ApiSelect';
        formFieldId.title = relationship.name;
        formFieldId.fieldName = (relationship.system ? '' : 'extData.') + relationship.relationshipName + 'Id';
        formFieldId.operator = 'equals';
        formFieldId.value = null;
        formFieldId.colProps = {
          span: 8,
        };
        formFieldId.componentProps = {
          // more details see /src/components/Form/src/components/ApiSelect.vue
          api: relationshipApis[relationship.relationshipName],
          params: {},
          resultField: 'records',
          // use name as label
          labelField: relationship.otherEntityField,
          // use id as value
          valueField: 'id',
          // not request untill to select
          immediate: false,
          onChange: e => {
            console.log('selected:', e);
          },
          // atfer request callback
          onOptionsChange: options => {
            console.log('get options', options.length, options);
          },
        };
        result.push(formFieldId);
      // const formFieldTitle: any = {};
      // formFieldTitle.type = 'String';
      // formFieldTitle.title = relationship.name;
      // formFieldTitle.fieldName =
      //   (relationship.system ? '' : 'extData.') + relationship.relationshipName + '.' + relationship.otherEntityField;
      // formFieldTitle.operator = 'contains';
      // formFieldTitle.value = null;
      // result.push(formFieldTitle);
    }
  });
  return result;
}

export function xGenerateFilterTree(commonTableData: ICommonTable | undefined, relationshipApis) {
  const result: any[] = [];
  const fields = commonTableData?.commonTableFields?.filter(field => field.showInFilterTree) ?? [];
  fields.forEach(field => {
    const filterItem: any = {};
    filterItem.title = field.title;
    filterItem.key = field.entityFieldName;
    filterItem.value = field.entityFieldName;
    filterItem.type = 'filterGroup';
    filterItem.children = [];
    switch (field.type) {
      case CommonFieldType.BOOLEAN:
        const filerSubItemTrue: any = {};
        filerSubItemTrue.filterName = field.entityFieldName + '.equals';
        filerSubItemTrue.filterValue = true;
        filerSubItemTrue.title = '是';
        filerSubItemTrue.type = 'filterItem';
        filerSubItemTrue.value = field.entityFieldName + 'true';
        const filerSubItemFalse: any = {};
        filerSubItemTrue.filterName = field.entityFieldName + '.equals';
        filerSubItemTrue.filterValue = false;
        filerSubItemTrue.title = '否';
        filerSubItemTrue.type = 'filterItem';
        filerSubItemTrue.value = field.entityFieldName + 'false';
        filterItem.children.push(filerSubItemTrue);
        filterItem.children.push(filerSubItemFalse);
        result.push(filterItem);
        break;
      case CommonFieldType.DATA_DICTIONARY:
      case CommonFieldType.ENUM:
      case CommonFieldType.ZONED_DATE_TIME:
    }
  });
  const relationships = commonTableData?.relationships?.filter(relationship => relationship.showInFilterTree) ?? [];
  relationships.forEach(async relationship => {
    const filterItem: any = {};
    filterItem.title = relationship.name;
    filterItem.key = relationship.relationshipName;
    filterItem.value = relationship.relationshipName;
    filterItem.type = 'filterGroup';
    filterItem.children = [];
    if (relationship.otherEntityIsTree) {
      const treeData = await relationshipApis[relationship.otherEntityName].tree();
      filterItem.children = xTransformToFilterTree(treeData, relationship);
      result.push(filterItem);
    } else {
      const data = await relationshipApis[relationship.otherEntityName].tree();
      if (data) {
        data.forEach(record => {
          const filterSubItem: any = {};
          filterSubItem.filterName = relationship.relationshipName;
          filterSubItem.filterValue = record.id;
          filterSubItem.key = relationship.relationshipName + record.id;
          filterSubItem.title = record[relationship.otherEntityField];
          filterSubItem.type = 'filterItem';
          filterSubItem.value = `${relationship.relationshipName}${record.id}`;
          filterSubItem.record = record;
          filterItem.children.push(filterSubItem);
        });
      }
      result.push(filterItem);
    }
  });
  return result;
}

function xTransformToFilterTree(record, relationship) {
  const result: any[] = [];
  const filterItem: any = {};
  filterItem.title = relationship.name;
  filterItem.key = relationship.relationshipName;
  filterItem.value = relationship.relationshipName;
  filterItem.type = 'filterGroup';
  filterItem.children = [];
  record.forEach(recordItem => {
    const filterSubItem: any = {};
    filterSubItem.filterName = relationship.relationshipName;
    filterSubItem.filterValue = recordItem.id;
    filterSubItem.title = recordItem[relationship.otherEntityField];
    filterSubItem.type = 'filterItem';
    filterSubItem.key = relationship.relationshipName + recordItem.id;
    filterSubItem.value = `${relationship.relationshipName}${recordItem.id}`;
    filterSubItem.record = recordItem;
    if (recordItem.children) {
      filterSubItem.children = transformToFilterTree(recordItem.children, relationship);
    }
    result.push(filterSubItem);
  });
  return result;
}

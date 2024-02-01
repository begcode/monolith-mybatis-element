import accountService from '@/api/account/account-service-provider';
import systemServices from '@/api/system/index';
import settingsServices from '@/api/settings/index';
import filesServices from '@/api/files/index';
import reportServices from '@/api/report/index';
import taskjobServices from '@/api/taskjob/index';
import logServices from '@/api/log/index';
// jhipster-needle-add-entity-service-to-main-import - BegCode will import entities services here

export default {
  account: accountService,
  system: systemServices,
  settings: settingsServices,
  files: filesServices,
  report: reportServices,
  taskjob: taskjobServices,
  log: logServices,
  // jhipster-needle-add-entity-service-to-main-body - BegCode will import entities services here
};

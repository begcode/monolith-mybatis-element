import AccountService from '@/api/account/account.service';
// jhipster-needle-add-entity-service-to-main-import - BegCode will import entities services here

export default {
  account: () => new AccountService(),
  // jhipster-needle-add-entity-service-to-main - BegCode will import entities services here
};

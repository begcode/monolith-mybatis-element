import request from '@/axios';

const apiUrl = '/api/cache-manage';

export default {
  // begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

  getAll(): Promise<string[]> {
    return request.get({ url: apiUrl });
  },

  clear(cacheName: string): Promise<any> {
    return request.delete({ url: `${apiUrl}/${cacheName}` });
  },

  // jhipster-needle-service-add-method - JHipster will add getters and setters here, do not remove
};

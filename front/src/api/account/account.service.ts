import request from '@/axios';
import { LoginParams } from '@/api-service/sys/model/userModel';
import { ErrorMessageMode } from '@/types/axios';
import { User } from '@/models/system/user.model';

const baseApiUrl = '/api';

// begcode-please-regenerate-this-file 如果您不希望重新生成代码时被覆盖，将please修改为don't ！！！

export default {
  authenticateWithoutCaptcha(params: LoginParams, mode: ErrorMessageMode = 'modal'): Promise<Object> {
    return request.post({ url: `${baseApiUrl}/authenticate/withoutCaptcha`, data: params }, { errorMessageMode: mode });
  },
  authenticate(params: LoginParams, mode: ErrorMessageMode = 'modal'): Promise<Object> {
    return request.post({ url: `${baseApiUrl}/authenticate`, data: params }, { errorMessageMode: mode });
  },
  getAccount(mode: ErrorMessageMode = 'none'): Promise<User> {
    return request.get({ url: `${baseApiUrl}/account` }, { errorMessageMode: mode });
  },
  updateImageUrl(url: string): Promise<Object> {
    return request.put({ url: `${baseApiUrl}/account/imageUrl`, params: `?imageUrl=${url}` }, { errorMessageMode: 'none' });
  },
  updateAccount(userInfo: any): Promise<User> {
    return request.post({ url: `${baseApiUrl}/account`, params: userInfo }, { errorMessageMode: 'none' });
  },
  changePassword(param: any): Promise<Object> {
    return request.post({ url: `${baseApiUrl}/account/change-password`, params: param }, { errorMessageMode: 'none' });
  },
  // jhipster-needle-service-add-method - BegCode will add getters and setters here, do not remove
};

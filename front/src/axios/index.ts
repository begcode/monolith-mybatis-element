import { isFunction } from 'lodash-es';
import { ElMessage } from 'element-plus';
import { AxiosRequestConfig } from 'axios';
import service from './service';
import { useUserStoreWithOut } from '@/store/modules/user';
import { CONTENT_TYPE } from '@/constants';

const request = (option: AxiosConfig) => {
  const { url, method, params, data, headers, responseType } = option;
  const userStore = useUserStoreWithOut();
  const headersData: any = {
    'Content-Type': CONTENT_TYPE,
  };
  if (userStore.getToken) {
    headersData.Authorization = userStore.getToken;
    Object.assign(headersData, headers);
  }
  return service.request({
    url,
    method,
    params,
    data,
    responseType: responseType,
    headers: headersData,
  });
};

export default {
  /**
   * @description:  File Upload
   * 文件上传
   */
  uploadFile(config: AxiosRequestConfig, params: any, callback?: any) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }
    config.baseURL = 'upload';
    if (params.data) {
      Object.keys(params.data).forEach(key => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        if (typeof value === 'object') {
          const blob = new Blob([JSON.stringify(value)], {
            type: 'application/json',
          });
          formData.append(key, blob);
        } else {
          formData.append(key, params.data![key]);
        }
      });
    }

    return request({
      ...config,
      method: 'post',
      data: formData,
      // @ts-ignore
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8',
        // @ts-ignore
        ignoreCancelToken: true,
      },
    }).then((res: any) => {
      if (callback?.success && isFunction(callback?.success)) {
        callback?.success(res?.data);
      } else if (callback?.isReturnResponse) {
        return Promise.resolve(res?.data);
      } else {
        if (res.status === 200 || res.status === 201 || res.status === 204) {
          ElMessage.success(res.data.message);
        } else {
          Promise.reject(res.data);
        }
      }
    });
  },
  get: <T = any>(option: AxiosConfig) => {
    return request({ method: 'get', ...option }) as Promise<T>;
  },
  post: <T = any>(option: AxiosConfig) => {
    return request({ method: 'post', ...option }) as Promise<T>;
  },
  delete: <T = any>(option: AxiosConfig) => {
    return request({ method: 'delete', ...option }) as Promise<T>;
  },
  put: <T = any>(option: AxiosConfig) => {
    return request({ method: 'put', ...option }) as Promise<T>;
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url);
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest();
  },
};

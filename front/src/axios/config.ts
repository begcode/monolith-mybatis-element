import { ElMessage } from 'element-plus';
import qs from 'qs';
import { AxiosConfig, AxiosResponse, AxiosRequestHeaders, AxiosError, InternalAxiosRequestConfig } from './types';
import { useI18n } from '@/hooks/web/useI18n';
import { useUserStoreWithOut } from '@/store/modules/user';

const config: AxiosConfig = {
  /**
   * 接口请求超时时间
   */
  timeout: 60000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json',

  interceptors: {
    //请求拦截
    // requestInterceptors: (config) => {
    //   return config
    // },
    // 响应拦截器
    // responseInterceptors: (result: AxiosResponse) => {
    //   return result
    // }
  },
};

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (config.method === 'post' && (config.headers as AxiosRequestHeaders)['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
  }
  if (config.method === 'get' && config.params) {
    let url = config.url as string;
    url += '?';
    const keys = Object.keys(config.params);
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`;
      }
    }
    url = url.substring(0, url.length - 1);
    config.params = {};
    config.url = url;
  }
  return config;
};
(error: AxiosError) => {
  console.log(error);
  Promise.reject(error);
};

const checkStatus = (status: number | undefined, msg: string): void => {
  const { t } = useI18n();
  const userStore = useUserStoreWithOut();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      userStore.removeToken();
      errMessage = msg || t('sys.api.errMsg401');
      userStore.logout();
      break;
    case 403:
      errMessage = t('sys.api.errMsg403');
      break;
    // 404请求不存在
    case 404:
      errMessage = t('sys.api.errMsg404');
      break;
    case 405:
      errMessage = t('sys.api.errMsg405');
      break;
    case 408:
      errMessage = t('sys.api.errMsg408');
      break;
    case 500:
      errMessage = t('sys.api.errMsg500');
      break;
    case 501:
      errMessage = t('sys.api.errMsg501');
      break;
    case 502:
      errMessage = t('sys.api.errMsg502');
      break;
    case 503:
      errMessage = t('sys.api.errMsg503');
      break;
    case 504:
      errMessage = t('sys.api.errMsg504');
      break;
    case 505:
      errMessage = t('sys.api.errMsg505');
      break;
    default:
  }

  if (errMessage) {
    ElMessage.error(errMessage);
  }
};

const defaultResponseInterceptors = (response: AxiosResponse<any>) => {
  if (response.status === 200 || response.status === 201 || response.status === 204) {
    return Promise.resolve(response.data);
  } else {
    console.log('error:response', response);
    checkStatus(response.response.status, '');
    return Promise.reject(response.data);
  }
};
(error: AxiosError) => {
  console.log('err' + error); // for debug
  checkStatus(error.status, error.message);
  ElMessage.error(error.message);
  return Promise.reject(error);
};

export { defaultResponseInterceptors, defaultRequestInterceptors };
export default config;

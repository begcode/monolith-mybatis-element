import { merge } from 'lodash-es';

function genMessage(langs: Record<string, Record<string, any>>, _prefix = 'lang') {
  const obj: Record<string, string> = {};

  Object.keys(langs).forEach(key => {
    merge(obj, langs[key].default);
  });
  return obj;
}

const modules = import.meta.glob('./*.json', { eager: true });
export default {
  ...genMessage(modules, 'zh-cn'),
};

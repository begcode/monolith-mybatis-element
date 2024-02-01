/**
 *
 * @param component 需要注册的组件
 * @param alias 组件别名
 * @returns any
 */
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: any) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};

export const getCssVar = (prop: string, dom = document.documentElement) => {
  return getComputedStyle(dom).getPropertyValue(prop);
};

/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};

/**
 * @param str 需要转驼峰的下划线字符串
 * @returns 字符串驼峰
 */
export const underlineToHump = (str: string): string => {
  if (!str) return '';
  return str.replace(/\-(\w)/g, (_, letter: string) => {
    return letter.toUpperCase();
  });
};

/**
 * 驼峰转横杠
 */
export const humpToDash = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
};

export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val);
};

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
// eslint-disable-next-line
export const findIndex = <T = Recordable>(ary: Array<T>, fn: Fn): number => {
  if (ary.findIndex) {
    return ary.findIndex(fn);
  }
  let index = -1;
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: T = fn(item, i, ary);
    if (ret) {
      index = i;
      return ret;
    }
  });
  return index;
};

export const trim = (str: string) => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * @param {Date | number | string} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 */
export function formatTime(time: Date | number | string, fmt: string) {
  if (!time) return '';
  else {
    const date = new Date(time);
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
  }
}

/**
 * 生成随机字符串
 */
export function toAnyString() {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0;
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString();
  });
  return str;
}

/**
 * 首字母大写
 */
export function firstUpperCase(str: string) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

/**
 * 把对象转为formData
 */
export function objToFormData(obj: Recordable) {
  const formData = new FormData();
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key]);
  });
  return formData;
}

/**
 * 简单实现防抖方法
 *
 * 防抖(debounce)函数在第一次触发给定的函数时，不立即执行函数，而是给出一个期限值(delay)，比如100ms。
 * 如果100ms内再次执行函数，就重新开始计时，直到计时结束后再真正执行函数。
 * 这样做的好处是如果短时间内大量触发同一事件，只会执行一次函数。
 *
 * @param fn 要防抖的函数
 * @param delay 防抖的毫秒数
 * @returns {Function}
 */
export function simpleDebounce(fn, delay = 100) {
  let timer: any | null = null;
  return function () {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // @ts-ignore
      fn.apply(this, args);
    }, delay);
  };
}

/**
 * 日期格式化
 * @param date 日期
 * @param block 格式化字符串
 */
export function dateFormat(date, block) {
  if (!date) {
    return '';
  }
  let format = block || 'yyyy-MM-dd';
  date = new Date(date);
  const map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = `0${v}`;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return date
        .getFullYear()
        .toString()
        .substr(4 - all.length);
    }
    return all;
  });
  return format;
}

export function openWindow(url: string, opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

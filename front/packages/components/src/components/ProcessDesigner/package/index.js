import ProcessDesigner from './designer';
import ProcessPalette from './palette';
import ProcessPenal from './penal';

const components = [ProcessDesigner, ProcessPenal, ProcessPalette];

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.1',
  install,
  ...components,
};

import xdmCaster from './components/xdmCaster/index';
import wylUpload from './components/wylUpload/index';
const components = [
  xdmCaster,
  wylUpload
]
const install = function(Vue: any): void {
  components.forEach((item) => {
    Vue.component(item.name, item)
  })
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  xdmCaster,
  wylUpload
}

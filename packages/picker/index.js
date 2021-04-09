import Picker from './src/index.vue';

/* istanbul ignore next */
Picker.install = function(Vue) {
  Vue.component(Picker.name, Picker);
};

export default Picker;
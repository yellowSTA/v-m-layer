import CityPicker from './src/index.vue';

/* istanbul ignore next */
CityPicker.install = function(Vue) {
  Vue.component(CityPicker.name, CityPicker);
};

export default CityPicker;
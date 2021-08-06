import ActionSheet from './src/index.vue';

/* istanbul ignore next */
ActionSheet.install = function(Vue) {
  Vue.component(ActionSheet.name, ActionSheet);
};

export default ActionSheet;
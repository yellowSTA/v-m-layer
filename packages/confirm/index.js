// import Alert from './src/index.vue';

// /* istanbul ignore next */
// Alert.install = function(Vue) {
//   Vue.component(Alert.name, Alert);
// };

// export default Alert;
import ConfirmComponent from './src/index.vue'
import { mergeOptions } from '../../src/utils/index'

let $vm;

const plugin = {
    install(Vue) {
        const ConfirmInstance = Vue.extend(ConfirmComponent);

        if (!$vm) {
            $vm = new ConfirmInstance({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        function confirm (options) {
            return new Promise((resolve, reject) => {
                mergeOptions($vm, options)

                $vm.$off('onConfirm');
                $vm.$off('onCancel');

                $vm.$on('onConfirm',() => {
                    resolve()
                })

                $vm.$on('onCancel',() => {
                    reject()
                })
                $vm.show = true
            })

        }

        let plugins = Vue.prototype.$layer || {};
        if (!plugins.confirm) {
            plugins.confirm = confirm;
        }
        Vue.prototype.$layer = plugins;
    }
}

export default plugin
export const install = plugin.install
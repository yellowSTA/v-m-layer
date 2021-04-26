import AlertComponent from './src/index.vue'
import { mergeOptions } from '../../src/utils/index'

let $vm;

const plugin = {
    install(Vue) {
        const AlertInstance = Vue.extend(AlertComponent);

        if (!$vm) {
            $vm = new AlertInstance({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        function alert (text, title = '提示') {
            return new Promise((resolve) => {
                mergeOptions($vm, { text, title, onClose: () => resolve() })

                $vm.show = true
            })

        }

        let plugins = Vue.prototype.$layer || {};
        if (!plugins.alert) {
            plugins.alert = alert;
        }
        Vue.prototype.$layer = plugins;
    }
}

export default plugin
export const install = plugin.install
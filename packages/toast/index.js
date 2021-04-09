import ToastComponent from './src/index.vue'
import { mergeOptions } from '../../src/utils/index'

let $vm;

const plugin = {
    install(Vue) {
        const ToastInstance = Vue.extend(ToastComponent);

        if (!$vm) {
            $vm = new ToastInstance({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const toast = function (options) {

            mergeOptions($vm, options)

            return new Promise((resolve) => {
                $vm.$watch('show', val => {
                    if (val) {
                        setTimeout(() => {
                            $vm.show = false;
                            resolve()
                        }, options.delay || 1500);
                    }
                })
                $vm.show = true
            })

        }

        let plugins = Vue.prototype.$layer || {};
        if (!plugins.toast) {
            plugins.toast = toast;
        }
        Vue.prototype.$layer = plugins;
    }
}

export default plugin
export const install = plugin.install
import ToptipComponent from './src/index.vue'
import { mergeOptions } from '../../src/utils/index'

let $vm;

const plugin = {
    install(Vue) {
        const ToptipInstance = Vue.extend(ToptipComponent);

        if (!$vm) {
            $vm = new ToptipInstance({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const toptip = function (options) {

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
        if (!plugins.toptip) {
            plugins.toptip = toptip;
        }
        Vue.prototype.$layer = plugins;
    }
}

export default plugin
export const install = plugin.install
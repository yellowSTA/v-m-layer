import ToastComponent from '../../components/toast/toast'
import { mergeOptions } from '../helper'

let $vm;
let watcher;

const plugin = {
    install(vue, options = {}){
        const Toast = vue.extend(ToastComponent);

        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        /* const defaults = {}
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default
            }
        } */

        const toast = function(text, time, pos = 'middle'){
            let opt = {
                text,
                time: time || 2000,
                pos
            }
            mergeOptions($vm, opt)
            $vm.show = true;

            setTimeout(() => {
                $vm.show = false;
            }, opt.time);
        }
        let plugins = vue.prototype.$layer || {};
        if(!plugins.toast) {
            plugins.toast = toast;
        }
        vue.prototype.$layer = plugins;
    }
}

export default plugin
export const install = plugin.install
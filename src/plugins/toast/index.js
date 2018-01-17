import ToastComponent from '@/components/toast'
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

        const defaults = {}
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default
            }
        }

        const toast = function(text, time){
            let opt = {
                text,
                time
            }
            mergeOptions($vm, opt)
            $vm.show = true
        }
        
        if (!vue.$layer) {
            vue.$layer = {
              toast
            }
        } else {
            vue.$layer.toast = toast
        }

        vue.mixin({
            created: function () {
                this.$layer = vue.$layer
            }
        })

    }
}

export default plugin
export const install = plugin.install
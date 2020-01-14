import ToptipComponent from '../../components/toptip/toptip'
import { mergeOptions } from '../helper'

let $vm;

const plugins = {
    install(vue, options){
        const Toptip = vue.extend(ToptipComponent);

        if(!$vm){
            $vm = new Toptip({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const toptip = function(content, time, className = 'defaultTip'){
            let opt = {
                content,
                time: time || 2000,
                className
            }

            mergeOptions($vm, opt)

            $vm.show = true;
            setTimeout(() => {
                $vm.show = false;
            }, opt.time);
        }

        let plugins = vue.prototype.$layer || {};
        if(!plugins.toptip) {
            plugins.toptip = toptip;
        }
        vue.prototype.$layer = plugins;
    }
}

export default plugins;
export const install = plugins.install;
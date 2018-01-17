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

        const toptip = function(content, time){
            let opt = {
                content,
                time: time || 2000
            }

            mergeOptions($vm, opt)

            $vm.show = true;
        }

        if(!vue.$layer){
            vue.$layer = {
                toptip
            }
        } else{
            vue.$layer.toptip = toptip
        }

        vue.mixin({
            created: function(){
                this.$layer = vue.$layer;
            }
        })
    }
}

export default plugins;
export const install = plugins.install;
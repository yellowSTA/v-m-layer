import LoadingComponent from '@/components/loading'
import { mergeOptions } from '../helper'

let $vm;

const plugins = {
    install(vue, options){
        const Loading = vue.extend(LoadingComponent);

        if(!$vm){
            $vm = new Loading({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const loading = function(text, time){
            let opt = {
                text,
                time: time || 2000
            }

            mergeOptions($vm,opt)

            $vm.show = true;
        }

        if(!vue.$layer){
            vue.$layer = {
                loading
            }
        } else{
            vue.$layer.loading = loading
        }
    }
}

export default plugins;
export const install = plugins.install;
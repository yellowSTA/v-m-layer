import LoadingComponent from '../../components/loading/loading'
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

        const loading = {
            show(text){
                let opt = {
                    text
                }
    
                mergeOptions($vm,opt)
    
                $vm.show = true;
            },
            hide() {
                $vm.show = false;
            }
        }

        let plugins = vue.prototype.$layer || {};
        if(!plugins.loading) {
            plugins.loading = loading;
        }
        vue.prototype.$layer = plugins;
    }
}

export default plugins;
export const install = plugins.install;
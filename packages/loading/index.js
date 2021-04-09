import LoadingComponent from './src/index.vue'
import { mergeOptions } from '../../src/utils/index'

let $vm;

const plugins = {
    install(vue){
        const Loading = vue.extend(LoadingComponent);

        if(!$vm){
            $vm = new Loading({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const loading = {
            show(message = '加载中..'){
                mergeOptions($vm, { message })
    
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
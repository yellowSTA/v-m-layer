import AlertComponent from '@/components/alert/alert'
import { mergeOptions } from '../helper'

let $vm;

const plugin = {
    install(vue, options) {
        const Alert = vue.extend(AlertComponent);

        if(!$vm){
            $vm = new Alert({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const alert = function(text, title, onOk) {

            if(typeof title == "function"){
				onOk = arguments[1];
				title = '提示';
            }

            if(typeof title == "undefined"){
                title = '提示';
            }
            
            let opt = {
                text,
                title,
                onOk
            }
            
            mergeOptions($vm, opt)

            this.watcher && this.watcher();

            this.watcher = $vm.$watch('show', (val) => {
                if(val == false){
                    opt.onOk && opt.onOk($vm)
                    this.watcher && this.watcher();
                }
            })
            $vm.show = true
        }

        if(!vue.$layer){
            vue.$layer = {
                alert
            }
        } else{
            vue.$layer.alert = alert;
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
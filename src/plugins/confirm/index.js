import ConfirmComponent from '../../components/confirm/confirm'
import { mergeOptions } from '../helper'

let $vm;

const plugins = {
    install(vue, options){
        const Confirm = vue.extend(ConfirmComponent);

        if(!$vm){
            $vm = new Confirm({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el);
        }

        const confirm = function(content, title, onConfirm, onCancel){
            if(typeof title == "function"){
                onCancel = arguments[2] || function(){};
                onConfirm = arguments[1];
                title = '提示';
            }

            let opt = {
                content,
                title,
                onConfirm,
                onCancel
            }

            if(typeof content == 'object'){

                opt = content

            }
            
            mergeOptions($vm, opt)

            $vm.$off('onConfirm');
            $vm.$off('onCancel');

            $vm.$on('onConfirm',() => {
                opt.onConfirm && opt.onConfirm()
            })

            $vm.$on('onCancel',() => {
                opt.onCancel && opt.onCancel()
            })
            $vm.show = true

        }

        if(!vue.$layer){
            vue.$layer = {
                confirm
            }
        } else{
            vue.$layer.confirm = confirm
        }

        vue.mixin({
            created: function(){
                this.$layer = vue.$layer;
            }
        })
    }
}

export default plugins;
export const install = plugins.install
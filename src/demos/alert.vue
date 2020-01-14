<template>
    <div class="text-center">
        <div @click="showAlert" style="margin-top:40px">点击显示弹窗</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { AlertPlugins } from '../plugins'
Vue.use(AlertPlugins)

export default{
    data() {
        return {

        }
    },
    methods: {
        showAlert() {
            this.$layer.alert('我是通过插件调用的',function(vm){
                console.log('你点击了确定')
                console.log(vm);
            })
        },
        sure() {
            console.log('你点击了确定')
        }
    }
}
</script>

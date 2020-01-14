<template>
    <div class="text-center">
        <div @click="showConfirm" style="margin-top:40px">点击显示confirm</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { ConfirmPlugins } from '../plugins'
Vue.use(ConfirmPlugins)

export default{
    data() {
        return {
            
        }
    },
    methods: {
        showConfirm() {
            this.$layer.confirm('我是通过插件调用的',function(){
                console.log('你点击了确定')
            })
        }
    }
}
</script>

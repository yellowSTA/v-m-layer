<template>
    <div class="text-center">
        <div @click="showToast" style="margin-top:40px">点击显示toast</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { ToastPlugins } from '../plugins'
Vue.use(ToastPlugins)

export default{
    data() {
        return {
            msg: '123'
        }
    },
    created() {
        
    },
    methods: {
        showToast() {
            this.$layer.toast('我是通过插件调用的',3000, 'bottom')
        }
    }
}
</script>

<template>
    <div class="text-center">
        <div @click="showToast" style="margin-top:40px">点击显示toast</div>
        <div @click="showToast2" style="margin-top:40px">插件形式调用toast</div>
        <toast v-model="show" :text="msg" :time="1500"></toast>
    </div>
</template>

<script>
import Vue from 'vue'
import toast from '../components/toast/toast'
import { ToastPlugins } from '../plugins'
Vue.use(ToastPlugins)

export default{
    data() {
        return {
            show: false,
            msg: '我是通过组件调用的'
        }
    },
    methods: {
        showToast() {
            this.show = true
        },
        showToast2() {
            this.$layer.toast('我是通过插件调用的',3000)
        }
    },
    components: {
        toast
    }
}
</script>

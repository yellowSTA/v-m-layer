<template>
    <div class="text-center">
        <div @click="showToptip" style="margin-top:40px">点击显示toptip</div>
        <div @click="showToptip2" style="margin-top:40px">更换样式</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { ToptipPlugins } from '../plugins'
Vue.use(ToptipPlugins)

export default{
    data() {
        return {
           
        }
    },
    methods: {
        showToptip() {
            this.$layer.toptip('我是通过插件调用的',3000)
        },
        showToptip2() {
            this.$layer.toptip('我是通过插件调用的',2000, 'defaultTip2')
        }
    }
}
</script>

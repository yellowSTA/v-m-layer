<template>
    <div class="text-center">
        <div @click="showToptip" style="margin-top:40px">点击显示toptip</div>
        <div @click="showToptip2" style="margin-top:40px">插件形式调用toptip</div>
        <toptip v-model="show" :content="msg" :time="1500"></toptip>
    </div>
</template>

<script>
import Vue from 'vue'
import toptip from '../components/toptip/toptip'
import { ToptipPlugins } from '../plugins'
Vue.use(ToptipPlugins)

export default{
    data() {
        return {
            show: false,
            msg: '我是通过组件调用的'
        }
    },
    methods: {
        showToptip() {
            this.show = true
        },
        showToptip2() {
            this.$layer.toptip('我是通过插件调用的',3000)
        }
    },
    components: {
        toptip
    }
}
</script>

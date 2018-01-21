<template>
    <div class="text-center">
        <div @click="showConfirm" style="margin-top:40px">点击显示confirm</div>
        <div @click="showConfirm2" style="margin-top:40px">插件形式调用confirm</div>
        <confirm v-model="show" :content="msg" title="提示1" @onConfirm="sure" @onCancel="cancel"></confirm>
    </div>
</template>

<script>
import Vue from 'vue'
import confirm from '../components/confirm/confirm'
import { ConfirmPlugins } from '../plugins'
Vue.use(ConfirmPlugins)

export default{
    data() {
        return {
            show: false,
            msg: '我是通过组件调用的'
        }
    },
    methods: {
        showConfirm() {
            this.show = true
        },
        showConfirm2() {
            this.$layer.confirm('我是通过插件调用的',function(){
                console.log('你点击了确定')
            })
        },
        sure() {
            console.log('你点击了确定')
        },
        cancel() {
            console.log('你点击了取消')
        }
    },
    components: {
        confirm
    }
}
</script>

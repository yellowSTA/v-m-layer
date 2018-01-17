<template>
    <div>
        <div @click="showAlert" style="margin-top:40px">点击显示弹窗</div>
        <div @click="showAlert2" style="margin-top:40px">插件形式调用弹窗</div>
        <alert v-model="show" :text="msg" title="提示1" @onOk="sure"></alert>
    </div>
</template>

<script>
import Vue from 'vue'
import Alert from '../components/alert/alert'
import { AlertPlugins } from '../plugins'
Vue.use(AlertPlugins)

export default{
    data() {
        return {
            show: false,
            msg: '我是通过组件调用的'
        }
    },
    methods: {
        showAlert() {
            this.show = true
        },
        showAlert2() {
            this.$layer.alert('我是通过插件调用的',function(){
                console.log('你点击了确定')
            })
        },
        sure() {
            console.log('你点击了确定')
        }
    },
    components: {
        Alert
    }
}
</script>

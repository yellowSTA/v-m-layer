<template>
    <div class="text-center">
        <button type="button" @click="showAlert" style="margin-top:40px">点击显示弹窗</button>
    </div>
</template>

<script>
import Vue from 'vue'
import Alert from '../../packages/alert'
Vue.use(Alert)

export default{
    data() {
        return {

        }
    },
    methods: {
        showAlert() {
            this.$layer.alert('我是通过插件调用的', '提示').then(() => {
                console.log('点击了确定')
            })
        }
    }
}
</script>

<template>
    <div class="text-center">
        <div style="margin-top:40px" @click="showloading">显示loading</div>
    </div>
</template>

<script>
import Vue from 'vue'
import { LoadingPlugins } from '../plugins'
Vue.use(LoadingPlugins)

export default {
    data() {
        return {
            
        }
    },
    methods: {
        showloading() {
            this.$layer.loading.show('加载...')
            setTimeout(() => {
               this.$layer.loading.hide() 
            },2000)
        }
    }
}
</script>

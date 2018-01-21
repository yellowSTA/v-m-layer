<template>
    <div class="text-center">
        <div style="margin-top:40px" @click="showloading">显示loading</div>
        <div style="margin-top:40px" @click="showloading2">插件调用loading</div>

        <loading v-model="show">加载中...</loading>
    </div>
</template>

<script>
import Loading from '../components/loading/loading'
import Vue from 'vue'
import { LoadingPlugins } from '../plugins'
Vue.use(LoadingPlugins)

export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        showloading() {
            this.show = true;
            setTimeout(() => {
                this.show = false 
            }, 3000);
        },
        showloading2() {
            this.$layer.loading.show('加载...')
            setTimeout(() => {
               this.$layer.loading.hide() 
            },2000)
        }
    },
    components: {
        Loading
    }
}
</script>

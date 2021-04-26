<!--
 * @Author: huangyan
 * @Date: 2021-04-06 17:42:04
 * @LastEditTime: 2021-04-26 10:32:19
 * @LastEditors: huangyan
 * @Description: alert弹窗组件
 * @FilePath: \v-m-layer\packages\alert\src\index.vue
-->
<template>
    <div>
        <transition name="overlay"><div class="modal-overlay" v-if="show"></div></transition>
        <transition name="modal">
            <div class="modal-box" v-if="show">
                <div class="modal m-alert">
                    <div class="modal-inner">
                        <div class="modal-title">{{title}}</div>
                        <div class="modal-text" v-if="text" v-html="text"></div>
                        <div class="modal-text" v-else><slot></slot></div>
                    </div>
                    <div class="modal-buttons ">
                        <span class="modal-button" @click="_onOk">确定</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '提示'
        },
        text: String,
        onClose: Function
    },
    data() {
        return {
            show: false
        }
    },
    created() {
        
    },
    methods: {
        _onOk() {
            this.show = false;
            this.onClose && this.onClose()
        },
        open() {
            this.show = true
        }
    },
    watch: {
        
    }
}
</script>

<style lang="scss" scoped>
@import url('../../../src/assets/css/layer.css');
.modal-enter{
    opacity: 0;
    transform: scale(1.185);
}
.modal-leave-active{
    transform: scale(0.815);
    opacity: 0;
}
.overlay-enter,
.overlay-leave-active{opacity: 0;}

.overlay-enter-active,
.overlay-leave-active,
.modal-enter-active,
.modal-leave-active {
    transition: transform .3s,opacity 0.3s;
}
</style>



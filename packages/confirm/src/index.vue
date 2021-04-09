<template>
    <div>
        <transition name="overlay"><div class="modal-overlay"  v-if="show"></div></transition>
        <transition name="modal">
            <div class="modal-box" v-if="show">
                <div class="modal m-confirm">
                    <div class="modal-inner">
                        <div class="modal-title">{{title}}</div>
                        <div class="modal-text" v-if="message" v-text="message"></div>
                        <div class="modal-text" v-else><slot></slot></div>
                    </div>
                    <div class="modal-buttons ">
                        <span class="modal-button" @click="_onCancel">取消</span>
                        <span class="modal-button" @click="_onConfirm">确定</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        title:{
            type: String,
            default: '提示'
        },
        message: String
    },
    data() {
        return {
            show: false
        }
    },
    created() {
        
    },
    methods: {
        _onConfirm() {
            this.show = false;
            this.$emit('onConfirm');
        },
        _onCancel() {
            this.show = false;
            this.$emit('onCancel');
        }
    }
}
</script>

<style scoped>
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


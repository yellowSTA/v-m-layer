<template>
    <transition name="modal">
        <div class="modal-box" v-if="show" :class="{top: pos == 'top', middle: pos == 'middle', bottom: pos == 'bottom'}">
            <div class="modal m-toast" >
                <div class="modal-mask"></div>
                <div v-if="message" v-text="message"></div>
                <div v-else><slot></slot></div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Toast',
    props: {
        delay: {
            type: Number,
            default: 2000
        },
        pos: {
            type: String,
            default: 'middle'
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
    watch: {
        
    }
}
</script>

<style scoped>
@import url('../../styles/index.scss');
.m-toast {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50px;
    color: white;
    padding: 10px 20px;
    font-size: 14px;
    width: auto;
}
.top {
    bottom: 50%;
}
.bottom {
    bottom: 50%;
}
.modal-enter{
    opacity: 0;
    transform: scale(1.185);
}
.modal-leave-active{
    transform: scale(0.815);
    opacity: 0;
}
.modal-enter-active,
.modal-leave-active {
    transition: transform .3s,opacity 0.3s;
}
</style>

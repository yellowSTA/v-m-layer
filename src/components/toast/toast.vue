<template>
    <transition name="modal">
        <div class="modal-box" v-show="show" :class="{top: pos == 'top', middle: pos == 'middle', bottom: pos == 'bottom'}">
            <div class="modal m-toast" >
                <div class="modal-mask"></div>
                <p v-if="text" v-html="text"></p>
                <p v-else><slot></slot></p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        time: {
            type: Number,
            default: 2000
        },
        pos: {
            type: String,
            default: 'middle'
        },
        text: String
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
.top {
    bottom: 50%;
}
.bottom {
    top: 50%;
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

<template>
    <div>
        <div class="modal-mask" v-show="show"></div>
        <transition name="toptip">
            <div class="m-toptip" :class="[className]" v-show="show" >
                <p v-if="content">{{content}}</p>
                <p v-else><slot></slot></p>
            </div> 
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        content: String,
        time: {
            type: Number,
            default: 2000
        },
        className: String
    },
    data() {
        return{
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
.defaultTip {
    background: #ef4437;
    height: 34px;
    line-height: 34px;
}
.defaultTip2 {
    background: #1e9033;
    height: 40px;
    line-height: 40px;
}
.toptip-enter-active, .toptip-leave-active {
  transition: transform .3s;
}
.toptip-enter, .toptip-leave-to {
  transform: translate3d(0,-100%,0);
}
</style>

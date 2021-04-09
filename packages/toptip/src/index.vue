<template>
    <div>
        <transition name="toptip">
            <div v-if="show" class="m-toptip" :class="[type]" >
                <div>{{message}}</div>
            </div> 
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        type: String
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

<style lang="scss" scoped>
.m-toptip {
    position: fixed;
    z-index: 10000;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    color: #fff;
    transition: all .3s;
    background-color: #ef4437;
}

.m-toptip.success {
    background: #3cc51f;
}

.m-toptip.warning {
    background: #f60;
}
.toptip-enter-active, .toptip-leave-active {
  transform: translate3d(0, 0, 0);
}
.toptip-enter, .toptip-leave-to {
  transform: translate3d(0,-100%,0);
}
</style>

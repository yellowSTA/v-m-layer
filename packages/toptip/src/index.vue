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
@import url('../../../src/styles/index.scss');
.m-toptip {
    position: fixed;
    z-index: 10000;
    top: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
    color: #fff;
    &.success {
        background: #3cc51f;
    }
    &.warning {
        background: #f60;
    }
    
    &.active {
        transform: translate3d(0, 0, 0);
    }
}

.toptip-enter-active, .toptip-leave-active {
  transform: translate3d(0, 0, 0);
}
.toptip-enter, .toptip-leave-to {
  transform: translate3d(0,-100%,0);
}

</style>

<template>
    <div>
        <transition name="overlay"><div class="modal-overlay"  v-if="show"></div></transition>
        <transition name="actions">
            <div class="m-actionsheet" v-if="show">
                <div class="actions-title" v-show="title">{{title}}</div>
                <div class="actions-menu">
                    <div 
                        class="actions-cell" 
                        v-for="(item, index) in menus" 
                        :key="index" 
                        @click="onMenuClick(item,index)"
                    >{{item[actionKey]}}</div>
                </div>
                <div class="actions-cancel actions-cell" @click="close">取消</div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'ActionSheet',
    props: {
        title: String,
        menus: {
            type: Array,
            default: () => []
        },
        actionKey: {
            type: String,
            default: 'name'
        }
    },
    data() {
        return {
            show: false
        }
    },
    created() {
        
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.show = false;
            this.$emit('close');
        },
        onMenuClick(item, index){
            this.show = false;
            this.$emit('select',item, index);
        }
    },
    watch: {
        
    }
}
</script>

<style scoped>
.m-actionsheet {
    position: fixed;
    left: 0;
    bottom: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 5000;
    width: 100%;
    z-index: 10601;
    background: #efeff4;
}

.m-actionsheet.active {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform .3s;
    transition: -webkit-transform .3s;
    transition: transform .3s;
    transition: transform .3s, -webkit-transform .3s;
}

.actions-cell {
    position: relative;
    padding: 10px 0;
    text-align: center;
    font-size: 18px;
    background: #fff;
}

.actions-cell:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
}

.actions-cancel {
    margin-top: 6px;
}

.actions-title {
    position: relative;
    height: 65px;
    padding: 0 20px;
    line-height: 1.4;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    color: #888;
    background: #fcfcfd;
}
.actions-enter-active, .actions-leave-active {
  transition: transform .3s;
}
.actions-enter, .actions-leave-to {
  transform: translate3d(0,100%,0);
}
.overlay-enter,
.overlay-leave-active{opacity: 0;}

.overlay-enter-active,
.overlay-leave-active,
.actions-enter-active,
.actions-leave-active {
    transition: transform .3s,opacity 0.3s;
}
</style>

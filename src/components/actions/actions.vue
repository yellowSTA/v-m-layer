<template>
    <div>
        <transition name="overlay"><div class="modal-overlay"  v-show="show"></div></transition>
        <transition name="actions">
            <div class="m-actionsheet" v-show="show">
                <div class="actions-title" v-show="title">{{title}}</div>
                <div class="actions-menu">
                    <div class="actions-cell" v-for="(item, index) in menu" :key="index" @click="onMenuClick(item,index)">{{item.text}}</div>
                </div>
                <div class="actions-cancel actions-cell" @click="_onCancel">取消</div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        menu: Array,
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: false
        }
    },
    created() {
        if(this.value){
            this.show = true
        }
    },
    methods: {
        _onCancel() {
            this.show = false;
            this.$emit('on-actions-close');
        },
        onMenuClick(item, index){
            this.show = false;
            this.$emit('on-actions-menu',item, index);
        }
    },
    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            this.$emit('input', val)
        }
    }
}
</script>

<style scoped>
.actions-enter-active, .actions-leave-active {
  transition: transform .4s;
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

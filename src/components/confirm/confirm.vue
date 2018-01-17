<template>
    <div>
        <transition name="overlay"><div class="modal-overlay"  v-show="show"></div></transition>
        <transition name="modal">
            <div class="modal m-confirm" v-show="show">
                <div class="modal-inner">
                    <div class="modal-title">{{title}}</div>
                    <div class="modal-text" v-if="content" v-html="content"></div>
                    <div class="modal-text" v-else><slot></slot></div>
                </div>
                <div class="modal-buttons ">
                    <span class="modal-button" @click="_onCancel">取消</span>
                    <span class="modal-button" @click="_onConfirm">确定</span>
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
        content: String,
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
            this.show = true;
        }
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
    },
    watch: {
        show(val) {
            if(val){
                setTimeout(() => {
                    let dom = document.getElementsByClassName("m-confirm");
                    for (let i = 0; i < dom.length; i++) {
                        let h = dom[i].clientHeight;
                        dom[i].style.marginTop = -h/2 + 'px';
                    }
                },10)
            }
            this.$emit('input',val)
        },
        value(val) {
            this.show = val;
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


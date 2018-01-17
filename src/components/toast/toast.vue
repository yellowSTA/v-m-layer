<template>
    <transition name="modal">
        <div class="modal m-toast" v-show="show">
            <div class="modal-mask"></div>
            <p v-if="text" v-html="text"></p>
            <p v-else><slot></slot></p>
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
        value: {
            type: Boolean,
            default: false
        },
        text: String
    },
    data() {
        return {
            show: false
        }
    },
    created() {
        if (this.value) {
            this.show = true
        }
        
    },
    watch: {
        show(val){
            if(val){
                this.$emit('input', true)
                setTimeout(() => {
                    let dom = document.getElementsByClassName("m-toast")[0];
                    let w = dom.clientWidth;
                    dom.style.marginLeft = -w/2 + 'px';
                },10)
                
                setTimeout(() => {
                    this.$emit('input', false) 
                    this.show = false;
                    
                },this.time);
            }
        },
        value(val, oldVal) {
            this.show = val
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
.modal-enter-active,
.modal-leave-active {
    transition: transform .3s,opacity 0.3s;
}
</style>

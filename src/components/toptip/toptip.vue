<template>
    <div>
        <div class="modal-mask" v-show="show"></div>
        <transition name="toptip">
            <div class="m-toptip" v-show="show" >
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
        value: {
            type: Boolean,
            default:false
        },
        time: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return{
            show: false
        }
    },
    created() {
        if(this.value){
            this.show = true
        }
    },
    watch: {
        value(val) {
            this.show = val
        },
        show(val) {
            if(val){
                this.$emit('input', true);

                setTimeout(() => {
                    this.$emit('input',false);
                    this.show = false;
                },this.time)
            }
        }
    }
}
</script>

<style scoped>
.toptip-enter-active, .toptip-leave-active {
  transition: transform .3s;
}
.toptip-enter, .toptip-leave-to {
  transform: translate3d(0,-100%,0);
}
</style>

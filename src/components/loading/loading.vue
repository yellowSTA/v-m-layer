<template>
    <div class="m-loading" v-show="show">
        <div class="modal-mask"></div>
        <div class="toast">
            <i class="icon"></i>
            <p class="toast-content" v-if="text">{{text}}</p>
            <p class="toast-content" v-else><slot></slot></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        text: String,
        time: Number,
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
    watch: {
        value(val){
            this.show = val
        },
        show(val){
            // this.$emit('input',val);
            if(val){
                this.$emit('input',true);
                if(this.time){
                    setTimeout(() => {
                        this.$emit('input',false);
                        this.show = false;
                    },this.time)
                }
            }
        }
    }
}
</script>

<style scoped>

</style>


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
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show (val) {
            this.$emit('update:show', val)
        }
    }
}
</script>

<style scoped>

</style>


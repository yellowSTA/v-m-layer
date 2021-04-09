<template>
    <div class="m-loading" v-if="show">
        <div class="modal-mask"></div>
        <div class="toast">
            <i class="icon"></i>
            <p class="toast-content" v-if="message">{{message}}</p>
            <p class="toast-content" v-else><slot></slot></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        message: String,
        time: Number
    },
    data() {
        return {
            show: false
        }
    }
}
</script>

<style scoped>
.m-loading .toast {
    position: fixed;
    z-index: 5001;
    width: 7.6em;
    min-height: 7.6em;
    top: 180px;
    left: 50%;
    margin-left: -3.8em;
    background: rgba(17, 17, 17, 0.7);
    text-align: center;
    border-radius: 5px;
    color: #FFFFFF;
}

.m-loading .icon {
    display: block;
    margin: 30px auto 6px auto;
    width: 38px;
    height: 38px;
    animation: loading 1s steps(12, end) infinite;
    background: url(./loading.svg) no-repeat;
    background-size: 100%;
}

@keyframes loading {
    0% {
        -webkit-transform: rotate3d(0, 0, 1, 0deg);
        transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
        -webkit-transform: rotate3d(0, 0, 1, 360deg);
        transform: rotate3d(0, 0, 1, 360deg);
    }
}
</style>


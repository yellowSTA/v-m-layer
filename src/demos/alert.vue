<template>
    <div>
        <span @click="showAlert">showalert</span>
        <alert v-model="show" :text="msg"></alert>
    </div>
</template>

<script>
import Alert from '../components/alert/alert'

export default{
    data() {
        return {
            show: false,
            msg: '错误提示语'
        }
    },
    created() {
        alert('ssss')
    },
    methods: {
        showAlert() {
            this.show = true
        }
    },
    components: {
        Alert
    }
}
</script>

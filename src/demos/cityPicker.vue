<template>
    <div class="text-center">
        <input type="text" style="margin-top:40px" v-model="pickervalue" readonly @click="showpicker" />
        <cityPicker ref="picker" :datas="chinaAddress" title="请选择地区" @select="selct"></cityPicker>
    </div>
</template>

<script>
import chinaAddress from '../datas/address.json'
import cityPicker from '../../packages/cityPicker'

export default {
    data() {
        return {
            chinaAddress: chinaAddress,
            pickervalue: ''
        }
    },
    methods: {
        showpicker() {
            this.$refs.picker.open()
        },
        selct(values) {
            console.log(values)
        },
        
    },
    components: {
        cityPicker
    }
}
</script>

<style scoped>

</style>

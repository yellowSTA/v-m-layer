<template>
    <div>
        <input type="text" style="margin-top:40px" v-model="pickervalue" readonly @click="showpicker" />
        <cityPicker v-model="show" :data="chinaAddress" :defaultValue="pickervalue" title="请选择地区" @on-shadow-change="selct"></cityPicker>
    </div>
</template>

<script>
import chinaAddress from '../datas/address.json'
import cityPicker from '../components/cityPicker/cityPicker'

export default {
    data() {
        return {
            show: false,
            chinaAddress: chinaAddress,
            pickervalue:'湖北省 武汉市 武昌区',
        }
    },
    methods: {
        showpicker() {
            this.show = true
        },
        selct(values, ids, data) {
            console.log(values)
            this.pickervalue = values.join(' ');
        }
    },
    components: {
        cityPicker
    }
}
</script>

<style scoped>

</style>

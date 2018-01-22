<template>
    <div class="text-center">
        <input type="text" style="margin-top:40px" v-model="pickervalue" readonly @click="showpicker" />
        <span @click="getText" style="margin-top:40px;display:block">根据id获取文字值</span>
        <cityPicker v-model="show" :data="chinaAddress" :defaultValue="pickervalue" title="请选择地区" @on-shadow-change="selct"></cityPicker>
    </div>
</template>

<script>
import chinaAddress from '../datas/address.json'
import cityPicker from '../components/cityPicker/cityPicker'
import { getName } from '../plugins'

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
        },
        getText(){
            let ids = ['430000', '430400', '430407'];
            //将对应的省市区id和全国省市区传入 便可转换成对应的省市区文字
            let names = getName(ids, this.chinaAddress);
            console.log(names)
        }
    },
    components: {
        cityPicker
    }
}
</script>

<style scoped>

</style>

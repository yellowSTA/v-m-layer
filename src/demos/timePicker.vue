<template>
    <div>
        <input v-model="pickerValue" readonly @click="show =true" placeholder="请选择日期" />
        <time-picker v-model="show" :defaultValue="defaultValue" :minYear="2000" :maxYear="2050" @on-selected="select"></time-picker>
    </div>
</template>

<script>
import timePicker from '../components/timePicker/timePicker'
export default {
    data() {
        return {
            show: false,
            pickerValue:'',
            defaultValue:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()]
        }
    },
    methods: {
        select(values, item) {
            console.log(values,item)
            this.pickerValue = values.join("-")
            this.defaultValue = item
        }
    },
    components: {
        timePicker
    }
}
</script>

<style>

</style>

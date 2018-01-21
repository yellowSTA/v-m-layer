<template>
    <div class="text-center">
        <input type="text" style="margin-top:40px" v-model="pickervalue" readonly @click="showpicker" />
        <picker v-model="show" :data="menu" :defaultValue="pickervalue" @on-change="select"></picker>
    </div>
</template>

<script>
import picker from '../components/picker/picker'
export default {
    data() {
        return {
            show: false,
            menu: [
                [{name:'赵',id:'01'},{name:'钱',id:'02'},{name:'孙',id:'03'},{name:'李',id:'04'},{name:'周',id:'04'}],
                [{name:'杰伦',id:'11'},{name:'磊',id:'12'},{name:'小鹏',id:'13'},{name:'Baby',id:'14'}]
            ],
            pickervalue:'周 杰伦',
        }
    },
    methods: {
        showpicker() {
            this.show = true;
        },
        select(values, item) {
            console.log(values)
            console.log(item)
            this.pickervalue = values.join(" ")
        }
    },
    components: {
        picker
    }
}
</script>

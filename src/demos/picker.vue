<template>
    <div class="text-center">
        <input type="text" style="margin-top:40px" v-model="pickervalue" readonly @click="showpicker" placeholder="非联动" />
        <input type="text" style="margin-top:40px" v-model="pickervalue2" readonly @click="show2 = true" placeholder="单列数据" />
        <input type="text" style="margin-top:40px" v-model="pickervalue3" readonly @click="show3 = true" placeholder="数据联动" />
        <picker v-model="show" :data="menu" :defaultValue="defaultValue" @on-selected="select"></picker>
        <picker v-model="show2" :data="menu2" :defaultValue="defaultValue2" @on-selected="select2" title="选择手机"></picker>
        <picker v-model="show3" :data="menu3" :isLink="true" :columns="2" :defaultValue="defaultValue3" @on-selected="select3" title="选择地区"></picker>
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
            defaultValue:[{name:'李'},{name:'杰伦'}],
            pickervalue:'',

            show2: false,
            menu2: [
                ['小米','华为','联想','iPhone']
            ],
            defaultValue2:['华为'],
            pickervalue2:'',

            show3: false,
            menu3:[
                {name:'湖北省',value:'001',parent:'0'},
                {name:'广东省',value:'002',parent:'0'},
                {name:'山东省',value:'003',parent:'0'},
                {name:'武汉市',value:'004',parent:'001'},
                {name:'襄阳市',value:'005',parent:'001'},
                {name:'广州市',value:'006',parent:'002'},
                {name:'深圳市',value:'007',parent:'002'},
                {name:'青岛市',value:'008',parent:'003'},
                {name:'济南市',value:'009',parent:'003'},
            ],
            defaultValue3:[],
            pickervalue3:'',
        }
    },
    methods: {
        showpicker() {
            this.show = true;
        },
        select(values, item) {
            console.log(values,item)
            this.defaultValue = item;
            this.pickervalue = values.join(" ")
        },
        select2(values, item) {
            console.log(values,item)
            this.defaultValue2 = item;
            this.pickervalue2 = values.join(" ")
        },
        select3(values, item) {
            console.log(values,item)
            this.defaultValue3 = item;
            this.pickervalue3 = values.join(" ")
        }
    },
    components: {
        picker
    }
}
</script>

# v-m-layer screenshot
![alert.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/alert.png)
![confirm.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/confirm.png)
![loading.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/loading.png)
![toast.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/toast.png)
![toptip.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/toptip.png)
![actions.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/actions.png)
![picker.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/picker.png)
![cityPicker.png](https://github.com/yellowSTA/v-m-layer/raw/master/screenshot/cityPicker.png)

# v-m-layer

> 一个基于vue的弹窗组件,包含以下组件
+ alert
+ confirm
+ toptip
+ loading
+ actions
+ toast
+ picker
+ cityPicker
+ timePicker

## 安装

``` bash
npm install v-m-layer --save

然后在APP.vue或者组件内 import 'v-m-layer/src/assets/css/layer.css'
```

## 使用

### 1.alert
> this.$layer.alert( title, callback )  
> title: 弹窗内容  
> callback: 可选参数，点击确定回调函数

``` javascript

import Vue from 'vue'
import { AlertPlugins } from 'v-m-layer'
Vue.use(AlertPlugins)

export default{
    methods: {
        showalert() {
            this.$layer.alert('sssss',function(){
                console.log('你点击了确定')
            })
        }
    }
}
```

### 2.toast
> this.$layer.toast( msg, delay )  
> msg：提示信息  
> delay：可选参数，弹框存在时间  

``` javascript

import Vue from 'vue'
import { ToastPlugins } from 'v-m-layer'
Vue.use(ToastPlugins)

export default{
    methods: {
        showToast2() {
            this.$layer.toast('我是通过插件调用的',3000)
        }
    }
}
```

### 3.confirm
> 有两种传参方式  
> this.$layer.confirm(msg, onConfirm, onCancle)  
> this.$layer.confirm(msg, title, onConfirm, onCancle)

``` javascript

import Vue from 'vue'
import { ConfirmPlugins } from 'v-m-layer'
Vue.use(ConfirmPlugins)

export default{
    methods: {
        //1.弹窗内容  2.点击确定按钮回调  3.点击取消按钮回调
        showConfirm() {
            this.$layer.confirm('我是通过插件调用的',function(){
                console.log('你点击了确定')
            },function(){
                console.log('你点击了取消')
            })
        },
        //1.弹窗内容  2.弹窗标题  3.点击确定按钮回调  4.点击取消按钮回调
        showConfirm2() {
            this.$layer.confirm('我是通过插件调用的','提示',function(){
                console.log('你点击了确定')
            },function(){
                console.log('你点击了取消')
            })
        }
    }
}
```

### 4.loading
> this.$layer.loading.show(msg)  打开  
> this.$layer.loading.hide()  关闭

``` javascript

import Vue from 'vue'
import { LoadingPlugins } from 'v-m-layer'
Vue.use(LoadingPlugins)

export default{
    methods: {
        showloading() {
            this.$layer.loading.show('加载中...')
            /* setTimeout(() => {
               this.$layer.loading.hide() 
            },2000) */
        },
        hideloading() {
            this.$layer.loading.hide()
        }
    }
}
```

### 5.toptip
> this.$layer.toptip(msg, deley, className)  
> msg:  弹窗信息  
> deley:  可选参数，弹窗停留时间  
> className: 可选参数，通过样式名修改默认样式
``` javascript

import Vue from 'vue'
import { ToptipPlugins } from 'v-m-layer'
Vue.use(ToptipPlugins)

export default{
    methods: {
        showToptip2() {
            //1.内容  2.显示时间 默认 2000毫秒
            this.$layer.toptip('我是通过插件调用的',3000)
        }
    }
}
```

### 6.actions
> this.$refs.actions.open()  
> menu： 菜单  
> on-actions-menu： 点击菜单的回调  
> on-actions-close：  监听关闭回调  
> title： 标题
```html
<template>
    <div>
        <div style="margin-top:40px" @click="showactions">点击显示actions</div>
        <actions 
            ref="actions"
            title="请选择语言" 
            :menu="menu" 
            @on-actions-menu="itemClick"
            @on-actions-close="onClose">
        </actions>
    </div>
    <!--
        this.$refs.actions.open()
        menu: actions菜单
        on-actions-menu： 点击菜单的回调
        on-actions-close: 监听关闭回调
        title： 标题
    -->
</template>

<script>
import Actions from 'v-m-layer'
export default {
    data() {
        return {
            show: false,
            menu: [
                {text:'简体中文',id:'1'},
                {text:'繁体中文',id:'2'},
                {text:'English',id:'3'}
            ]
        }
    },
    methods: {
        showactions() {
            this.$refs.actions.open();
            //this.$refs.actions.close()
        },
        //item: 当前点击菜单对应的menu数据; index: 当前点击的序号
        itemClick(item, index) {
            console.log(item,index)
        }
    },
    components: {
        Actions
    }
}
</script>
```

### 7.picker
> this.$refs.picker.open()  
> data：picker数据  
> defaultValue：给picker的赋默认值  
> on-change：picker滚动就执行回调  
> on-selected：点击确定执行回调  
> isLink：是否开启联动，如果开启必须指定columns列数，数据格式参照meun3  
> columns：列数
```html
<template>
    <div>
        <input 
            type="text" 
            style="margin-top:40px" 
            v-model="pickervalue" 
            readonly 
            @click="showpicker" 
            placeholder="非联动" />

        <input 
            type="text" 
            style="margin-top:40px" 
            v-model="pickervalue2" 
            readonly 
            @click="$refs.picker2.open()" 
            placeholder="单列数据" />

        <input 
            type="text" 
            style="margin-top:40px" 
            v-model="pickervalue3" 
            readonly 
            @click="$refs.picker3.open()" 
            placeholder="数据联动" />

        <picker 
            ref="picker1" 
            :data="menu" 
            :defaultValue="defaultValue" 
            @on-selected="select">
        </picker>

        <picker 
            ref="picker2" 
            :data="menu2" 
            :defaultValue="defaultValue2" 
            @on-selected="select2" 
            title="选择手机">
        </picker>

        <picker 
            ref="picker3" 
            :data="menu3" 
            :isLink="true" 
            :columns="2" 
            :defaultValue="defaultValue3" 
            @on-selected="select3" 
            title="选择地区">
        </picker>
    </div>
    <!--
        data：picker数据
        defaultValue：给picker的赋默认值
        on-change：picker滚动就执行回调
        on-selected：点击确定执行回调
        isLink：是否开启联动，如果开启必须指定columns列数，数据格式参照meun3
        columns：列数
    -->
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
            this.$refs.picker1.open();
        },
        select(values, item) {
            console.log(values,item)
            this.defaultValue = item; //每次选择完给picker设置默认值，让picker记住选中的位置
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

```

### 8.cityPicker
> this.refs.picker.open()  
> data：省市区列表；v-m-layer提供了chinaAddress，如果需要使用自己的地址库，请遵循chinaAddress的格式  
> on-shadow-change: 用户选中执行回调，  
> 请保持input绑定的值和cityPicker组件的defaultValue的值一致，这样就可以使picker记住用户选中的值
```html
<template>
    <div>
        <input 
            type="text" 
            style="margin-top:40px" 
            v-model="pickervalue" 
            readonly 
            @click="showpicker" />

        <span 
            @click="getText" 
            style="margin-top:40px;display:block">
            根据id获取文字值
        </span>

        <cityPicker 
            ref="picker"
            :data="chinaAddress" 
            :defaultValue="pickervalue" 
            title="请选择地区" 
            @on-shadow-change="selct">
        </cityPicker>
    </div>
    <!--
        data：省市区列表；v-m-layer提供了chinaAddress，如果需要使用自己的地址库，请遵循chinaAddress的格式
        on-shadow-change: 用户选中执行回调，
        请保持input绑定的值和cityPicker组件的defaultValue的值一致，这样就可以使picker记住用户选中的值
    -->
</template>

<script>
import { cityPicker, chinaAddress } from 'v-m-layer'

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
            this.refs.picker.open()
        },
        //values 用户选中的省市区 是一个数组；ids 用户选中的省市区对应的国家地区编码
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
```

### 9.timePicker

```html
<template>
    <div>
        <input 
            v-model="pickerValue" 
            readonly
            @click="$refs.picker.open()" 
            placeholder="请选择日期" />

        <time-picker 
            ref="picker" 
            :defaultValue = "defaultValue" 
            :minYear="2000" 
            :maxYear="2050" 
            @on-selected="select">
        </time-picker>
    </div>
    <!-- 
        minYear：起始年份
        maxYear：截止年份
        on-selected：确定选择执行的回调
        defaultValue: 设置默认值
     -->
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
```
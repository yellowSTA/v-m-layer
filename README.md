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

## 安装

``` bash
npm install v-m-layer --save

然后在APP.vue或者组件内 require('v-m-layer/dist/layer.css')
```

## 使用

### 1.alert
+ 插件调用
``` javascript

import Vue from 'vue'
import { AlertPlugins } from 'v-m-layer'
Vue.use(AlertPlugins)

export default{
    methods: {
        showalert() {
            //第一个参数是弹窗内容，第二个参数是点击确定的回调
            this.$layer.alert('sssss',function(){
                console.log('你点击了确定')
            })
        }
    }
}
```
+ 组件调用
```html
<template>
    <div @click="showalert"></div>
    <alert v-model="show" :text="msg" title="提示1" @onOk="sure"></alert>
</template>

<!--
    v-model： 控制弹窗显示与隐藏
    text： 弹窗内容
    title：弹窗标题
    onOk： 点击确定按钮执行的函数 
-->
```
```javascript
import { alert } from 'v-m-layer'

export default{
    data() {
        return{
            show: false,
            msg: 'hellow world'
        }
    },
    mehtods: {
        showalert() {
            this.show = true
        },
        sure() {
            console.log('你点击了确定')
        }
    },
    components: {
        alert
    }
}

```

### 2.toast
+ 插件调用
``` javascript

import Vue from 'vue'
import { ToastPlugins } from 'v-m-layer'
Vue.use(ToastPlugins)

export default{
    methods: {
        //第一个参数是弹出内容，第二个参数是显示的时间
        showToast2() {
            this.$layer.toast('我是通过插件调用的',3000)
        }
    }
}
```
+ 组件调用
```html
<template>
    <div>
        <div @click="showToast" style="margin-top:40px">点击显示toast</div>
        <toast v-model="show" :text="msg" :time="1500"></toast>
    </div>
</template>

<!--
    v-model： 控制弹窗显示与隐藏
    text： 弹窗内容
    time:  显示时间
-->
```
```javascript
import { toast } from 'v-m-layer'

export default{
    data() {
        return{
            show: false,
            msg: 'hellow world'
        }
    },
    mehtods: {
        showToast() {
            this.show = true
        }
    },
    components: {
        toast
    }
}

```

### 3.confirm
+ 插件调用
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
+ 组件调用
```html
<template>
    <div>
        <div @click="showConfirm" style="margin-top:40px">点击显示confirm</div>
        <confirm v-model="show" :content="msg" title="提示1" @onConfirm="sure" @onCancel="cancel"></confirm>
    </div>
</template>

<!--
    v-model： 控制弹窗显示与隐藏
    content： 弹窗内容
    time:  显示时间
    title： 弹窗标题
    onConfirm： 点击确定按钮回调
    onCancel： 点击取消按钮回调
-->
```
```javascript
import { confirm } from 'v-m-layer'

export default{
    data() {
        return{
            show: false,
            msg: 'hellow world'
        }
    },
    mehtods: {
        showConfirm() {
            this.show = true
        },
        sure() {
            console.log('你点击了确定')
        },
        cancel() {
            console.log('你点击了取消')
        }
    },
    components: {
        confirm
    }
}

```

### 4.loading
+ 插件调用
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
+ 组件调用
```html
<template>
    <div>
        <div style="margin-top:40px" @click="showloading">显示loading</div>

        <loading :show="show">加载中...</loading>
    </div>
</template>

<!--
    show： 控制弹窗显示与隐藏
-->
```
```javascript
import { loading } from 'v-m-layer'

export default{
    data() {
        return{
            show: false,
            msg: 'hellow world'
        }
    },
    mehtods: {
        showloading() {
            this.show = true
            /* setTimeout(() => {
                this.show = false 
            }, 3000); */
        },
        hideloading() {
            this.show = false
        }
    },
    components: {
        loading
    }
}

```

### 5.toptip
+ 插件调用
``` javascript

import Vue from 'vue'
import { ToptipPlugins } from 'v-m-layer'
Vue.use(ToptipPlugins)

export default{
    methods: {
        showToptip2() {
            //1.内容  2.显示时间
            this.$layer.toptip('我是通过插件调用的',3000)
        }
    }
}
```
+ 组件调用
```html
<template>
    <div>
        <div style="margin-top:40px" @click="showToptip">显示showToptip</div>

        <toptip v-model="show" :content="msg" :time="1500"></toptip>
    </div>
</template>

<!--
    v-model： 控制弹窗显示与隐藏
    content： 内容
    time： 显示时间
-->
```
```javascript
import { toptip } from 'v-m-layer'

export default{
    data() {
        return{
            show: false,
            msg: 'hellow world'
        }
    },
    mehtods: {
        showToptip() {
            this.show = true
        }
    },
    components: {
        toptip
    }
}

```

### 6.actions
```html
<template>
    <div>
        <div style="margin-top:40px" @click="showactions">点击显示actions</div>
        <actions v-model="show" title="请选择语言" :menu="menu" @on-actions-menu="itemClick"></actions>
    </div>
    <!--
        v-model： 控制弹窗显示与隐藏
        menu: actions菜单
        on-actions-menu： 点击菜单的回调
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
            this.show = true;
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
```html
<template>
    <div>
        <input type="text" style="margin-top:40px" v-model="pickervalue" readonly @click="showpicker" />
        <picker v-model="show" :data="menu" :defaultValue="pickervalue" @on-change="select"></picker>
    </div>
    <!--
        v-model: 控制弹窗显示隐藏
        defaultValue：给picker的赋值
        on-change：用户选中执行回调
        请保持input绑定的值和picker组件的defaultValue的值一致，这样就可以使picker记住用户选中的值
    -->
</template>

<script>
import { picker } from 'v-m-layer'
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
        // values返回选择的结果，是一个数组；item：当前选中项在menu中对应的数据 
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

```

### 8.cityPicker
```html
<template>
    <div>
        <input type="text" style="margin-top:40px" v-model="pickervalue" readonly @click="showpicker" />
        <span @click="getText" style="margin-top:40px;display:block">根据id获取文字值</span>
        <cityPicker v-model="show" :data="chinaAddress" :defaultValue="pickervalue" title="请选择地区" @on-shadow-change="selct"></cityPicker>
    </div>
    <!--
        v-model: 控制弹窗显示隐藏
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
            this.show = true
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
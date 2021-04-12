<template>
    <div id="app">
        <!-- <button @click="openAlert">点击alert</button> -->
        <button @click="openAlert">点击toast</button>
        <!-- <action-sheet ref="actionRef" :menus="actions" action-key="name" @close="actionClose" @select="actionSelect"></action-sheet> -->
        <!-- <picker ref="pickerRef" :columns="columns" @select="select"></picker> -->
        <DatePicker ref="pickerRef" values="2020-05-02" @select="select"></DatePicker>
    </div>
</template>

<script>
import layer from '../packages'
import Vue from 'vue'
Vue.use(layer)
// Vue.use(Toast)
const DATA = [
    {
      text: '北京市',
      value: '110000',
      children: [
        {
          text: "北京市",
          value: '110100'
        }
      ]
    },
    {
      text: '天津市',
      value: '120000',
      children: [
        {
          text: "天津市",
          value: '120000'
        }
      ]
    },
    {
      text: '河北省',
      value: '130000',
      children: [
        {
          text: '石家庄市',
          value: '130100'
        },
        {
          text: '唐山市',
          value: '130200'
        },
        {
          text: '秦皇岛市',
          value: '130300'
        },
        {
          text: '邯郸市',
          value: '130400'
        },
        {
          text: '邢台市',
          value: '130500'
        },
        {
          text: '保定市',
          value: '130600'
        },
        {
          text: '张家口市',
          value: '130700'
        },
        {
          text: '承德市',
          value: '130800'
        }
      ]
    },
    {
      text: '山西省',
      value: '140000',
      children: [
        {
          text: '太原市',
          value: '140100'
        },
        {
          text: '大同市',
          value: '140200'
        },
        {
          text: '阳泉市',
          value: '140300'
        },
        {
          text: '长治市',
          value: '140400'
        },
        {
          text: '晋城市',
          value: '140500'
        },
        {
          text: '朔州市',
          value: '140600'
        },
        {
          text: '晋中市',
          value: '140700'
        }
      ]
    }
  ]

const DATA2 = [
    ['a', 'b', 'c'],
    ['d', 'e', 'f']
]
export default {
    name: 'App',
    data() {
        return {
            actions: [
                {name:'简体中文', id:'1'},
                {name:'繁体中文', id:'2'},
                {name:'English', id:'3'}
            ],
            columns: DATA
        }
    },
    methods: {
        openAlert() {
            console.log(this.$layer)
            // this.$layer.alert('弹窗走一波').then(() => {
            //     console.log('关闭')
            // })

            // this.$layer.toast({ message: 'toast测试', pos: 'top', delay: 2500 }).then(() => {
            //     console.log('自动关闭')
            // })

            // this.$layer.toptip({ message: 'toptip测试',  delay: 3000 }).then(() => {
            //     console.log('自动关闭')
            // })

            // this.$layer.confirm({ message: 'confirm test', title: 'tishi' }).then(() => {
            //     console.log('点击确定')
            // }).catch(() => {
            //     console.log('点击取消')
            // })

            // this.$layer.loading.show('加载中...')
            // setTimeout(() => {
            //     this.$layer.loading.hide()
            // }, 2000);

            // this.$refs.actionRef.open()
            this.$refs.pickerRef.open()
        },
        actionClose() {
            console.log('点击了关闭')
        },
        actionSelect(item, index) {
            console.log(item, index)
        },
        select(item) {
            console.log(item)
        }
    }
}
</script>
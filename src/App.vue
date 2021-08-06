<template>
    <div id="app">
        <ActionSheet/>
    </div>
</template>

<script>
import ActionSheet from '@/demos/cityPicker'
export default {
    name: 'App',
    components: { ActionSheet },
    data() {
        return {
        
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
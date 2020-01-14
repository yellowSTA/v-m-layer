<template>
    <div class="text-center">
        <div style="margin-top:40px" @click="showactios">点击显示actions</div>
        <actions ref="actions" title="请选择语言" :menu="menu" @on-actions-menu="itemClick" @on-actions-close="onClose"></actions>
    </div>
</template>

<script>
import Actions from '../components/actions/actions'
export default {
    data() {
        return {
            menu: [
                {text:'简体中文',id:'1'},
                {text:'繁体中文',id:'2'},
                {text:'English',id:'3'}
            ]
        }
    },
    methods: {
        showactios() {
            this.$refs.actions.open()
            //this.$refs.actions.close()
        },
        itemClick(item, index) {
            console.log(item,index)
        },
        onClose() {
            console.log('cancle');
        }
    },
    components: {
        Actions
    }
}
</script>

<style scoped>

</style>

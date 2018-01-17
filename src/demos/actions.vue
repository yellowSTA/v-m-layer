<template>
    <div>
        <div style="margin-top:40px" @click="showactios">点击显示actions</div>
        <actions v-model="show" title="请选择语言" :menu="menu" @on-actions-menu="itemClick"></actions>
    </div>
</template>

<script>
import Actions from '../components/actions/actions'
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
        showactios() {
            this.show = true;
        },
        itemClick(item, index) {
            console.log(item,index)
        }
    },
    components: {
        Actions
    }
}
</script>

<style scoped>

</style>

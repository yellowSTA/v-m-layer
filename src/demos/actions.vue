<template>
    <div class="text-center">
        <button type="button" style="margin-top:40px" @click="showactios">点击显示actions</button>
        <actions ref="actions" title="请选择语言" :menus="menu" @select="itemClick" @close="onClose"></actions>
    </div>
</template>

<script>
import Actions from '../../packages/actionSheet'
export default {
    data() {
        return {
            menu: [
                {name:'简体中文',id:'1'},
                {name:'繁体中文',id:'2'},
                {name:'English',id:'3'}
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

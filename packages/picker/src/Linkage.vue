<!-- 联动 -->
<template>
    <div class="wheel-wrapper">
        <div class="wheel" v-for="(data, index) in pickerData" :key="index">
            <ul class="wheel-scroll">
                <li
                    v-for="(item, index) in data" 
                    :key="index"
                    class="wheel-item"
                >
                    {{ item.text }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        datas: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            pickerData: []
        }
    },
    methods: {
        initData() {
            this.createData(this.datas)
        },
        createData(data) {
            this.$set(this.pickerData, this.pickerData.length, data)
            if (data[0].children) {
                this.createData(data[0].children)
            }
        },
        changeData(wheelIndex, selectIndex, wheel) {
            
        }
    }
}
</script>

<style lang="scss">
ul {
        list-style: none;
        padding: 0;
    }
</style>
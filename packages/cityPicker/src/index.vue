<template>
    <div class="container">
        <transition name="picker-fade">
            <div class="picker" v-show="state===1" @touchmove.prevent @click="_cancel">
                <transition name="picker-move">
                    <div class="picker-panel" v-show="state===1" @click.stop>
                        <div class="picker-choose border-bottom-1px">
                            <span class="cancel" @click="_cancel">取消</span>
                            <span class="confirm" @click="_confirm">确定</span>
                            <h1 class="picker-title">{{ title }}</h1>
                        </div>
                        <div class="picker-content">
                            <div class="mask-top border-bottom-1px"></div>
                            <div class="mask-bottom border-top-1px"></div>
                            <div class="wheel-wrapper" ref="wheelWrapper">
                                <div class="wheel" v-for="(num, index) in columnsNum" :key="index">
                                    <ul class="wheel-scroll">
                                        <li
                                            v-for="item in pickerData[num - 1]" 
                                            :key="item.value"
                                            class="wheel-item"
                                        >
                                            <template>{{ item.name }}</template>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="picker-footer"></div>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import Wheel from '@better-scroll/wheel'
    BScroll.use(Wheel)

    const STATE_HIDE = 0
    const STATE_SHOW = 1

    const EVENT_SELECT = 'select'
    const EVENT_CANCEL = 'cancel'
    const EVENT_CHANGE = 'change'

    export default {
        name: 'CityPicker',
        props: {
            columnsNum: {
                type: Number,
                validator: function(val) {
                    const res = val >= 1 && val <= 3;
                    if (!res) {
                        console.error('"columnsNum" 的值必须大于等于1小于等于3, at CityPicker')
                    }
                    return res
                }
            },
            title: {
                type: String,
                default: ''
            },
            values: {
                type: Array,
                default: () => []
            },
            datas: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                state: STATE_HIDE,
                selectedIndexPair: [0, 0, 0, 0],
                pickerData: [
                    [],
                    [],
                    []
                ]
            }
        },
        created() {
            this._initData()
        },
        methods: {
            open() {
                if (this.state === STATE_SHOW) {
                    return
                }
                // console.log(this.datas)
                this.state = STATE_SHOW

                if (!this.wheels) {
                    // this._initData() // 第一次打开初始化数据
                    this.$nextTick(() => {
                        this.wheels = []
                        let wheelWrapper = this.$refs.wheelWrapper
                        for (let i = 0; i < this.columnsNum; i++) {
                            this.wheels.push(this._createWheel(wheelWrapper.children[i], i))
                        }
                    })
                }
            },
            hide() {
                this.state = STATE_HIDE
            },
            _confirm() {
                this.wheels.forEach(wheel => {
                    /*
                     * if bs is scrolling, force it stop at the nearest wheel-item
                     * or you can use 'restorePosition' method as the below
                     */
                    // wheel.stop()
                    /*
                     * if bs is scrolling, restore it to the start position
                     * it is same with iOS picker and web Select element implementation
                     * supported at v2.1.0
                     */
                    wheel.restorePosition()
                })
                this.hide()

                const currentSelectedIndexPair = this.selectedIndexPair = this.wheels.map(wheel => {
                    return wheel.getSelectedIndex()
                })

                const selectedItem = this.pickerData.map((data, index) => {
                    const item = data.find((v, i) => i === currentSelectedIndexPair[index])
                    if (item) {
                        return { name: item.name, value: item.value }
                    }
                    return null
                })
                
                this.$emit(EVENT_SELECT, selectedItem.filter(item => !!item), currentSelectedIndexPair)
            },
            _cancel() {
                /*
                 * if bs is scrolling, restore it to the start position
                 * it is same with iOS picker and web Select element implementation
                 * supported at v2.1.0
                 */
                this.wheels.forEach(wheel => {
                    wheel.restorePosition()
                })
                this.hide()
                this.$emit(EVENT_CANCEL)
            },
            _createWheel(wheelDom, i) {
                let currentWheel = this.wheels[i]
                if (!currentWheel) {
                    currentWheel = new BScroll(wheelDom, {
                        wheel: {
                            selectedIndex: this.selectedIndexPair[i],
                            wheelWrapperClass: 'wheel-scroll',
                            wheelItemClass: 'wheel-item'
                        },
                        probeType: 3
                    })
                    currentWheel.on('scrollEnd', () => {
                        const selectIndex = currentWheel.getSelectedIndex()
                        this.$emit(EVENT_CHANGE, i, selectIndex)
                    
                        for(let n = i; n < this.wheels.length; n++) {
                            const next = n + 1;
                            const nextWheel = this.wheels[next];
                            if ((n + 1) >= this.wheels.length) return;

                            nextWheel.wheelTo(0)
                            this._initLinkData(n, this.wheels[n].getSelectedIndex())
                            this.$nextTick(() => {
                                nextWheel.refresh()
                            })
                        }
                        this.selectedIndexPair = this.wheels.map(wheel => wheel.getSelectedIndex())
                        
                    })
                } else {
                    currentWheel.refresh()
                }

                return currentWheel
            },
            /**
             * 初始化列表数据
             * @param {number} i - 索引，第几列
             * @param {number} selectIndex -当前列表选中的索引
             */
            _initLinkData(i, selectIndex) {
                const next = i + 1;
                const currentItem = this.pickerData[i][selectIndex];
                this.$set(this.pickerData, next, this.datas.filter(item => item.parent == currentItem.value))
            },
            _initData() {
                const provinces = this.datas.filter(item => !item.parent)
                const city = this.datas.filter(item => item.parent == (this.values[0] || provinces[0].value))
                const area = this.datas.filter(item => item.parent == (this.values[1] || city[0].value))
                // 设置默认选中
                if (this.values && this.values.length) {
                    const list = [provinces, city, area]
                    list.forEach((item, i) => {
                        const index = item.findIndex(v => v.value == this.values[i])
                        this.$set(this.selectedIndexPair, i, index === -1 ? 0 : index)
                    })
                }

                this.$set(this.pickerData, 0, provinces)
                this.$set(this.pickerData, 1, city)
                this.$set(this.pickerData, 2, area)
            },
            // 设置默认
            setDefault() {
                const values = this.values.split('-').map(item => Number(item))
                const indexs = this.pickerData.map((item, i) => item.findIndex(v => v == values[i]))
                this.selectedIndexPair = indexs
            }
        }
    }
</script>

<style lang="scss" scoped>
@import url('../../../src/styles/index.scss');
</style>
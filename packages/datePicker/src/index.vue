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
                                <div class="wheel" v-for="(data, index) in pickerData" :key="index">
                                    <ul class="wheel-scroll">
                                        <li
                                            v-for="(item, i) in data" 
                                            :key="i"
                                            class="wheel-item"
                                        >
                                            <template>{{ item }}</template>
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

    const date = new Date()

    export default {
        name: 'DatePicker',
        props: {
            type: {
                type: String,
                default: 'day'
            },
            title: {
                type: String,
                default: ''
            },
            values: {
                type: String,
                default: [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
            },
            start: {
                type: Number,
                default: 1990
            },
            end: {
                type: Number,
                default: date.getFullYear() + 1
            }
        },
        data() {
            return {
                state: STATE_HIDE,
                selectedIndexPair: [0, 0, 0, 0],
                pickerData: []
            }
        },
        created() {
            // this._initData()
        },
        methods: {
            open() {
                if (this.state === STATE_SHOW) {
                    return
                }

                this.state = STATE_SHOW

                if (!this.wheels) {
                    this._initData() // 第一次打开初始化数据
                    // waiting for DOM rendered
                    this.$nextTick(() => {
                        this.wheels = []
                        let wheelWrapper = this.$refs.wheelWrapper
                        for (let i = 0; i < this.pickerData.length; i++) {
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
                    return data.find((v, i) => i === currentSelectedIndexPair[index])
                })
                
                this.$emit(EVENT_SELECT, selectedItem.join('-'), currentSelectedIndexPair)
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
                            if ((n + 1) >= this.wheels.length) return;
                            if (n == 1 && this.type == 'day') {
                                this.createDays()
                            }

                            this.wheels[n + 1].wheelTo(0)
                            this.$nextTick(() => {
                                this.wheels[n + 1].refresh()
                            })
                        }
                        this.selectedIndexPair = this.wheels.map(wheel => wheel.getSelectedIndex())
                    })
                } else {
                    currentWheel.refresh()
                }

                return currentWheel
            },
            _initData() {
                let cols = [], year = [], month = [];
                for (let i = this.start; i <= this.end; i++) {
                    year.push(i)
                }
                cols.push(year)
                if (this.type == 'month' || this.type == 'day') {
                    month = this.fillArrayNum(12)
                    cols.push(month)
                }
                
                if (this.type == 'day') {
                    const days = this.getDuration(this.values)
                    cols.push(this.fillArrayNum(days))
                }
                this.pickerData = cols
                this.setDefault()
            },
            // 获取当月的天数
            getDuration (date) {
                let dt = new Date(date.replace(/-/g, '/')) // ios不能识别带横杠的日期
                dt.setMonth(dt.getMonth() + 1)   
                dt.setDate(0);  
                return dt.getDate()  
            },
            // 计算每月的天数
            createDays() {
                const { pickerData, selectedIndexPair } = this
                const date = `${pickerData[0][selectedIndexPair[0]]}-${pickerData[1][selectedIndexPair[1]]}`
                const days = this.getDuration(date)
                this.$set(this.pickerData, 2, this.fillArrayNum(days))
            },
            // 设置默认
            setDefault() {
                const values = this.values.split('-').map(item => Number(item))
                const indexs = this.pickerData.map((item, i) => item.findIndex(v => v == values[i]))
                this.selectedIndexPair = indexs
            },
            /**
             * 填充数据
             * @param {Number} num
             */
            fillArrayNum(num) {
                return Array(num).fill().map((_, i) => i < 9 ? '0' + (i + 1) : i + 1)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import url('../../../src/styles/index.scss');
</style>
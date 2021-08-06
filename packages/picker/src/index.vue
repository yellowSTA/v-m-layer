<!-- 非联动 -->
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
                                            v-for="(item, index) in data" 
                                            :key="index"
                                            class="wheel-item"
                                        >
                                            <template v-if="isLink">{{ item.text }}</template>
                                            <template v-else>{{ rangeKey ? item[rangeKey] : item }}</template>
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
        name: 'Picker',
        props: {
            columns: {
                type: Array,
                default: () => []
            },
            rangeKey: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            indexs: {
                type: Array,
                default: () => [0, 0, 0, 0]
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
            
        },
        computed: {
            // 判断是多列还是单列
            pickerType() {
                const firstItem = this.columns[0]
                if (typeof firstItem == 'string' || firstItem.constructor  === Object) {
                    return 'oneColumn'
                }
                return 'moreColumn'
            },
            // 是否是联动数据
            isLink() {
                return this.columns[0].children
            }
        },
        methods: {
            open() {
                if (this.state === STATE_SHOW) {
                    return
                }
                if (!this.pickerData.length) {
                    if (this.isLink) {
                        this._initLinkData(this.columns, 0, true)
                    } else {
                        this.pickerData = this.pickerType === 'oneColumn' ? [this.columns] : this.columns
                    }
                }

                this.state = STATE_SHOW

                if (!this.wheels) {
                    this.selectedIndexPair = this.indexs
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
                let res = this.pickerType == 'oneColumn' ? selectedItem[0] : selectedItem
                if (this.isLink) {
                    res = selectedItem.map(item => ({ text: item.text, value: item.value }))
                }
                
                this.$emit(EVENT_SELECT, res, currentSelectedIndexPair)
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
                    
                        // 如果是联动，需要渲染后面联动的数据
                        if (this.isLink) {
                            for(let n = i; n < this.wheels.length; n++) {
                                if ((n + 1) >= this.wheels.length) return;
                                this._initLinkData(this.pickerData[i][selectIndex].children, n+1)
                                this.wheels[n + 1].wheelTo(0)
                                this.$nextTick(() => {
                                    this.wheels[n + 1].refresh()
                                })
                            }
                        }
                    })
                } else {
                    currentWheel.refresh()
                }

                return currentWheel
            },
            /**
             * 初始化列表数据
             * @param {object} data -列数据
             * @param {number} i - 索引，第几列
             * @param {boolean} isFirst -是否是设置默认值
             */
            _initLinkData(data, i = 0, isFirst = false) {
                this.$set(this.pickerData, i, data)
                const d = isFirst ? data[this.selectedIndexPair[i]].children : data[0].children
                d && this._initLinkData(d , i + 1)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import url('../../../src/styles/index.scss');
</style>
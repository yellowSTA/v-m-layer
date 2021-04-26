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
    /* reset */
    ul {
        list-style: none;
        padding: 0;
    }


    .border-bottom-1px,
    .border-top-1px {
        position: relative;

        &:before,
        &:after {
            content: "";
            display: block;
            position: absolute;
            transform-origin: 0 0;
        }
    }

    .border-bottom-1px {

        &:after {

            border-bottom: 1px solid #ebebeb;
            left: 0;
            bottom: 0;
            width: 100%;
            transform-origin: 0 bottom;
        }
    }

    .border-top-1px {

        &:before {

            border-top: 1px solid #ebebeb;
            left: 0;
            top: 0;
            width: 100%;
            transform-origin: 0 top;
        }
    }

    @media (-webkit-min-device-pixel-ratio: 2),
    (min-device-pixel-ratio: 2) {
        .border-top-1px {

            &:before {

                width: 200%;
                transform: scale(.5) translateZ(0);
            }
        }

        .border-bottom-1px {

            &:after {

                width: 200%;
                transform: scale(.5) translateZ(0);
            }
        }

    }

    @media (-webkit-min-device-pixel-ratio: 3),
    (min-device-pixel-ratio: 3) {

        .border-top-1px {

            &:before {

                width: 300%;
                transform: scale(.333) translateZ(0);
            }
        }

        .border-bottom-1px {

            &:after {

                width: 300%;
                transform: scale(.333) translateZ(0);
            }
        }
    }


    .picker {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        overflow: hidden;
        text-align: center;
        font-size: 14px;
        background-color: rgba(37, 38, 45, .4);

        &.picker-fade-enter,
        &.picker-fade-leave-active {
            opacity: 0
        }

        &.picker-fade-enter-active,
        &.picker-fade-leave-active {
            transition: all .3s ease-in-out
        }


        .picker-panel {
            position: absolute;
            z-index: 600;
            bottom: 0;
            width: 100%;
            height: 273px;
            background: white;

            &.picker-move-enter,
            &.picker-move-leave-active {

                transform: translate3d(0, 273px, 0)
            }

            &.picker-move-enter-active,
            &.picker-move-leave-active {

                transition: all .3s ease-in-out
            }

            .picker-choose {

                position: relative;
                height: 60px;
                color: #999;

                .picker-title {

                    margin: 0;
                    line-height: 60px;
                    font-weight: normal;
                    text-align: center;
                    font-size: 18px;
                    color: #333;
                }

                .confirm,
                .cancel {

                    position: absolute;
                    top: 6px;
                    padding: 16px;
                    font-size: 14px;
                }

                .confirm {

                    right: 0;
                    color: #007bff;

                    &:active {
                        color: #5aaaff
                    }
                }

                .cancel {

                    left: 0;

                    &:active {

                        color: #c2c2c2
                    }
                }
            }
        }

        .picker-content {

            position: relative;
            top: 20px;

            .mask-top,
            .mask-bottom {

                z-index: 10;
                width: 100%;
                height: 68px;
                pointer-events: none;
                transform: translateZ(0);
            }

            .mask-top {

                position: absolute;
                top: 0;
                background: linear-gradient(to top, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
            }

            .mask-bottom {

                position: absolute;
                bottom: 1px;
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
            }

            /deep/ .wheel-wrapper {

                display: flex;
                padding: 0 16px;

                .wheel {

                    flex: 1;
                    width: 1%;
                    height: 173px;
                    overflow: hidden;
                    font-size: 18px;

                    .wheel-scroll {

                        padding: 0;
                        margin-top: 68px;
                        line-height: 36px;
                        list-style: none;

                        .wheel-item {

                            list-style: none;
                            height: 36px;
                            overflow: hidden;
                            white-space: nowrap;
                            color: #333;

                            &.wheel-disabled-item {

                                opacity: .2;
                            }
                        }
                    }
                }
            }
        }

        .picker-footer {

            height: 20px;
        }
    }
</style>
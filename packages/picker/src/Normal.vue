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
                                            {{ rangeKey ? item[rangeKey] : item }}
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
        name: 'normalPicker',
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
            }
        },
        data() {
            return {
                state: STATE_HIDE,
                selectedIndexPair: [0, 0, 0, 0]
            }
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
            pickerData() {
                if (this.pickerType === 'oneColumn') {
                    return [this.columns]
                }
                return this.columns
            }
        },
        methods: {
            open(defaultIndexs) {
                if (this.state === STATE_SHOW) {
                    return
                }

                this.state = STATE_SHOW
                this.selectedIndexPair = defaultIndexs || this.selectedIndexPair

                if (!this.wheels) {
                    // waiting for DOM rendered
                    this.$nextTick(() => {
                        this.wheels = []
                        let wheelWrapper = this.$refs.wheelWrapper
                        for (let i = 0; i < this.pickerData.length; i++) {
                            this._createWheel(wheelWrapper, i)
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
                    return data.find((v, i) => i === index)
                })
                const res = this.pickerType == 'oneColumn' ? selectedItem[0] : selectedItem
                
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
            _createWheel(wheelWrapper, i) {
                let currentWheel = this.wheels[i]
                if (!currentWheel) {
                    currentWheel = new BScroll(wheelWrapper.children[i], {
                        wheel: {
                            selectedIndex: this.selectedIndexPair[i],
                            wheelWrapperClass: 'wheel-scroll',
                            wheelItemClass: 'wheel-item'
                        },
                        probeType: 3
                    })
                    currentWheel.on('scrollEnd', () => {
                        this.$emit(EVENT_CHANGE, i, currentWheel.getSelectedIndex())
                    })
                } else {
                    currentWheel.refresh()
                }

                return currentWheel
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
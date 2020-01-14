<template>
    <div>
        <transition name="overlay">
            <div class="modal-overlay" v-show="show"></div>
        </transition>
        <transition name="picker">
            <div class="picker" v-show="show">
                <div class="picker-panel">
                    <div class="picker-title onepx">
                        <span class="cancel" @click="closePicker">取消</span>
                        <h2 class="title"><span v-show="title!=''">{{title}}</span></h2>
                        <span class="confirm pickerClose" @click="onConfirm">确定</span>
                    </div>
                    <div class="picker-content">
                        <div class="mask-top border-1px"></div>
                        <div class="wheel-wrapper">
                            <div class="wheel" v-for="(wrapper, index) in cols" :key="index" ref="wheel">
                                <ul class="wheel-scroll">
                                    <li class="wheel-item" v-for="(item, i) in wrapper" :class="{active:i==selectIndex[index]}" :key="i">{{item.name || item}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mask-bottom border-top-1px"></div>
                        <div class="mask-active"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    import Bscroll from "better-scroll"
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: function() {
                    return []
                }
            },
            isLink: {
                type: Boolean,
                default: false
            },
            defaultValue: {
                type: Array,
                default: () => {
                    return []
                }
            },
            columns: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                show: false,
                link: false,
                wheels: [],
                pickerSelect: [], //选择的值
                selectIndex: [0, 0, 0, 0, 0], //记录input中的值在picker中的位置
                flag: false,
                cols: [], //列数据
            }
        },
        created() {
            if (this.isLink) {
                this.link = true;
            }
        },
        methods: {
            open() {
                this.show = true;
            },
            close() {
                this.closePicker();
            },
            _initData() {
                let defaultValue = this.defaultValue;
                this.cols = this.data;

                if (this.link) {
                    this.cols = [];
                    this._initLinkData();
                }

                if (!defaultValue || !defaultValue instanceof Array || (!defaultValue.length)) {
                    this.cols.forEach((el, index) => {
                        this.pickerSelect[index] = el[0];
                        this.selectIndex[index] = 0;
                    })

                } else {
                    let len = this.cols.length;
                    for (let i = 0; i < len; i++) {
                        const element = this.cols[i];
                        element.forEach((el, index) => {
                            if (el == defaultValue[i] || (el.name == defaultValue[i].name && typeof el.name != 'undefined')) {
                                this.pickerSelect[i] = el;
                                this.selectIndex[i] = index;
                            }
                        })
                    }
                }

                this._initScroll()
            },
            //联动时初始化数据
            _initLinkData() {
                let defaultValue = this.defaultValue;
                let first = [];
                let colums = this.columns;

                this.data.forEach((el, index, arr) => {
                    if (el.parent == "0") {
                        first.push(el);
                    }
                })
                this.$set(this.cols, 0, first)

                //联动时必须指明columns(列数)
                if (isNaN(colums) || !colums) {
                    console.error('[picker] 渲染出错，如果为联动模式，需要指定 columns(列数)')
                    return false;
                }
                //将列数据找出来
                for (let i = 1; i < colums; i++) {
                    let id = this.cols[i - 1][0].value;
                    if (defaultValue instanceof Array && defaultValue.length) {
                        id = defaultValue[i - 1].value;
                    }

                    let child = this.getchildren(id)
                    this.$set(this.cols, i, child)
                }

            },
            //数据联动时，获取后面的子级数据
            getchildren(id) {
                let len = this.data.length;
                let arr = [];
                for (var i = 0; i < len; i++) {
                    if (this.data[i].parent == id) {
                        arr.push(this.data[i])
                    }
                }
                return arr;
            },
            //初始化滚动轴
            _initScroll() {
                this.$nextTick(() => {
                    let wrapper = this.$refs.wheel;
                    const _this = this;
                    const wrapperLen = wrapper.length;

                    for (let i = 0; i < wrapperLen; i++) {
                        this.wheels[i] = new Bscroll(wrapper[i], {
                            wheel: {
                                selectedIndex: _this.selectIndex[i],
                                activeClass: 'active'
                            },
                            probeType: 3
                        })

                        this.wheels[i].on("scrollEnd", function(pos) {
                            let index = _this.wheels[i].getSelectedIndex();
                            _this.$set(_this.selectIndex, i, index)
                            let values = [];
                            let data = _this.cols;

                            if (_this.link) {
                                for (let j = i; j < wrapperLen; j++) {
                                    let n = (i == j) ? index : 0; //判断取值的滚动轴是当前还是后面的

                                    let next = _this.getchildren(_this.cols[j][n].value);
                                    if ((j + 1) < _this.columns) {
                                        _this.$set(_this.cols, j + 1, next)
                                        _this.wheels[j + 1].refresh();
                                        _this.wheels[j + 1].wheelTo(0);
                                        _this.$set(_this.selectIndex, j + 1, 0)
                                    }
                                }
                                _this.getValue()
                            } else {
                                _this.pickerSelect[i] = data[i][index];
                                for (let j = 0; j < _this.pickerSelect.length; j++) {
                                    const element = _this.pickerSelect[j];

                                    let v = (typeof element.name == "undefined") ? element : element.name;
                                    values.push(v)
                                }

                                _this.$emit('on-change', values, _this.pickerSelect)
                            }
                        })
                    }
                })
            },
            //供联动时取值
            getValue() {
                let data = [];
                let ids = [];
                let values = [];
                this.$nextTick(() => {

                    for (let i = 0; i < this.wheels.length; i++) {
                        const element = this.wheels[i];
                        let index = element.getSelectedIndex() || 0;
                        let item = element.items[index]

                        data.push(this.cols[i][index])
                        ids.push(item.value);
                        values.push(item.innerText);
                    }
                    this.pickerSelect = data;
                    this.$emit('on-change', values, data);
                })
            },
            closePicker() {
                if (!this._canConfirm()) {
                    return false;
                }

                this.show = false;
            },
            _canConfirm() {
                return this.wheels.every((wheel) => {
                    return !wheel.isInTransition
                })
            },
            onConfirm() {
                if (!this._canConfirm()) {
                    return false;
                }

                let values = [];
                for (let i = 0; i < this.pickerSelect.length; i++) {
                    const el = this.pickerSelect[i];
                    values.push(el.name || el)
                }
                this.$emit('on-selected', values, this.pickerSelect)
                this.closePicker()
            }
        },
        watch: {
            show(val) {
                if(val){
                    this._initData();
                }
            },
        }
    }
</script>

<style scoped>
    .picker-enter-active,
    .picker-leave-active {
        transition: transform .4s;
    }

    .picker-enter,
    .picker-leave-to {
        transform: translate3d(0, 100%, 0);
    }

    .overlay-enter,
    .overlay-leave-active {
        opacity: 0;
    }

    .overlay-enter-active,
    .overlay-leave-active,
    .picker-enter-active,
    .picker-leave-active {
        transition: transform .3s, opacity 0.3s;
    }
</style>
<template>
    <div>
        <transition name="overlay"><div class="modal-overlay"  v-show="show"></div></transition>
        <transition name="picker">
            <div class="picker" v-show="show">
                <div class="picker-panel" >
                    <div class="picker-title">
                        <span class="cancel"></span>
                        <h2 class="title">{{title}}</h2>
                        <span class="confirm pickerClose" @click="closePicker">确定</span>
                    </div>
                    <div class="picker-content">
                        <div class="mask-top border-1px"></div>
                        <div class="wheel-wrapper" v-if="typeof data[0][0] != 'string'">
                            <div class="wheel" v-for="(wrapper, index) in data" :key="index" ref="wheel">
                                <ul class="wheel-scroll">
                                    <li class="wheel-item" v-for="(item, i) in wrapper" :key="i">{{item.name}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="wheel-wrapper" v-else>
                            <div class="wheel" v-for="(wrapper, index) in data" :key="index" ref="wheel">
                                <ul class="wheel-scroll">
                                    <li class="wheel-item" v-for="(item, i) in wrapper" :key="i">{{item}}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mask-bottom border-top-1px"></div>
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
            default: '请选择'
        },
        data: Array,
        value: {
            type: Boolean,
            default: false
        },
        defaultValue: ''
    },
    data() {
        return {
            show: false,
            wheels: [],
            pickerSelect: [], //选择的值
            selectIndex: [0,0,0], //记录input中的值在picker中的位置
            pickerDefaultValue:[]
        }
    },
    created() {
        if(this.value){
            this.show = true
        }
        this._initData();
    },
    methods: {
        _initData() {
            if(this.defaultValue){
                this.pickerDefaultValue = this.defaultValue.split(' ');

                let len = this.pickerDefaultValue.length <= this.data.length ? this.pickerDefaultValue.length : this.data.length
                for(let i=0; i<len; i++){
                    for(let j=0; j<this.data[i].length; j++){
                        if(this.data[i][j] == this.pickerDefaultValue[i] || this.data[i][j].name == this.pickerDefaultValue[i]){
                            this.pickerSelect[i] = this.data[i][j];
                            this.selectIndex[i] = j;
                        } else{
                            this.pickerSelect[i] = this.data[i][0];
                            this.selectIndex[i] = 0;
                        }
                    }
                }

                return false
            }
            this.data.forEach((el, index, arr) => {
                this.pickerSelect[index] = el[0]
            })
        },
        _initScroll() {
            let wrapper = this.$refs.wheel;
            const _this = this;

            this.$nextTick(() => {
                for(let i=0; i<wrapper.length; i++){
                    this.wheels[i] = new Bscroll(wrapper[i],{
                        wheel:{selectedIndex: _this.selectIndex[i]},
                        probeType: 3
                    })

                    this.wheels[i].on("scrollEnd",function(pos){
                        let index = _this.wheels[i].getSelectedIndex();
                        let values = [];

                        _this.pickerSelect[i] = _this.data[i][index];

                        for (let j = 0; j < _this.pickerSelect.length; j++) {
                            const element = _this.pickerSelect[j];
                            values.push(element.name)
                        }
                        _this.$emit('on-change',values,_this.pickerSelect)
                    })
                }
            })
        },
        closePicker() {
            if(!this._canConfirm()){
                return false;
            }
            
            this.show = false;
        },
        _canConfirm() {
            return this.wheels.every((wheel) => {
                return !wheel.isInTransition
            })
        }
    },
    watch: {
        show(val) {
            this.$emit('input', val)
        },
        value(val) {
            this.show = val;
            if(val && !this.wheels.length){
                this._initScroll()
            }
        }
    }
}
</script>

<style scoped>
.picker-enter-active, .picker-leave-active {
  transition: transform .4s;
}
.picker-enter, .picker-leave-to {
  transform: translate3d(0,100%,0);
}
.overlay-enter,
.overlay-leave-active{opacity: 0;}

.overlay-enter-active,
.overlay-leave-active,
.picker-enter-active,
.picker-leave-active {
    transition: transform .3s,opacity 0.3s;
}
</style>

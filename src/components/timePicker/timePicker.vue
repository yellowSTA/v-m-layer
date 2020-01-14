<template>
    <div>
        <transition name="overlay"><div class="modal-overlay"  v-show="show"></div></transition>
        <transition name="picker">
            <div class="picker" v-show="show">
                <div class="picker-panel" >
                    <div class="picker-title onepx">
                        <span class="cancel" @click="closePicker">取消</span>
                        <h2 class="title"><span v-show="title!=''">{{title}}</span></h2>
                        <span class="confirm pickerClose" @click="onConfirm">确定</span>
                    </div>
                    <div class="picker-content">
                        <div class="mask-top border-1px"></div>
                        <div class="wheel-wrapper">
                            <div class="wheel" v-for="(wrapper, index) in cols" :key="index" ref="wheel" v-if="index < columns">
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

const date = new Date();

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        defaultValue: {
            type: Array,
            default: () => {
                return [date.getFullYear(),date.getMonth()+1,date.getDate()]
            }
        },
        columns: {
            type: Number,
            default: 3
        },
        minYear: {
            type: Number,
            default: 1990
        },
        maxYear: {
            type: Number,
            default: new Date().getFullYear()
        }
    },
    data() {
        return {
            show: false,
            link: false,
            wheels: [],
            pickerSelect: [], //选择的值
            selectIndex: [0,0,0,0,0], //记录input中的值在picker中的位置
            flag: false,
            cols: [], //列数据
        }
    },
    created() {
        
    },
    methods: {
        open() {
            this.show = true;
        },
        close() {
            this.closePicker()
        },
        _initData() {
            let defaultValue = this.defaultValue.map((value,index,arr) => {
                return Number(value)
            })
            this._initTime()
            let data = this.cols;

            if(!defaultValue || !defaultValue instanceof Array || !defaultValue.length) {
                this.cols.forEach((el, index) => {
                    this.pickerSelect[index] = el[0];
                    this.selectIndex[index] = 0;
                })

            } else{
                
                for(let i=0; i<this.cols.length; i++) {
                    const element = this.cols[i];
                    element.forEach((el, index) => {
                        if(el == defaultValue[i] || (el.name == defaultValue[i].name && typeof el.name != 'undefined')) {
                            this.pickerSelect[i] = el;
                            this.selectIndex[i] = index;
                        }
                    })
                }
                let days = new Date(data[0][this.selectIndex[0]],data[1][this.selectIndex[1]],0).getDate();
                this.setDays(days)
            }
            this._initScroll()
        },
        _initTime() {
            const start = this.minYear;
            const end = this.maxYear;
            let len = end - start;
            let years = [],
                cols = [],
                days = [];
            let month = [1,2,3,4,5,6,7,8,9,10,11,12];

            for(let i=0; i<len; i++) {
                years.push(end-i);
            }

            cols.push(years)
            cols.push(month)
            
            if(this.columns == 3) {
                for(let i=0; i<31; i++) {
                    days.push(i+1)
                }

                cols.push(days)
            }
            
            this.cols = cols;
        },
        //初始化滚动轴
        _initScroll() {
            this.$nextTick(() => {
                let wrapper = this.$refs.wheel;
                const _this = this;
                const wrapperLen = wrapper.length;

                for(let i=0; i<wrapperLen; i++){
                    this.wheels[i] = new Bscroll(wrapper[i],{
                        wheel:{selectedIndex: _this.selectIndex[i],activeClass:'active'},
                        probeType: 3
                    })
                    
                    this.wheels[i].on("scrollEnd",function(pos){
                        let index = _this.wheels[i].getSelectedIndex();
                        _this.$set(_this.selectIndex,i,index)
                        let values = [];
                        let data = _this.cols;
                        
                        for(let j=i; j<wrapperLen; j++) {
                            if((j+1) < _this.columns) {
                                _this.wheels[j+1].refresh();
                                _this.wheels[j+1].wheelTo(0);
                                _this.$set(_this.selectIndex,j+1,0)
                            }
                            if(j < 2 && _this.columns == 3) {
                                let days = new Date(data[0][_this.selectIndex[0]],data[1][_this.selectIndex[1]],0).getDate();
                                _this.setDays(days)
                            }
                        }
                        _this.getValue()
                    })
                }
            })
        },
        setDays(n) {
            
            let arr = [];
            for(let i=0; i<n; i++) {
                arr.push(i+1)
            } 
            this.$set(this.cols,2,arr)
        },
        //取值
        getValue() {
            let data = [];
            let values = [];
            this.$nextTick(() => {

                for (let i = 0; i < this.wheels.length; i++) {
                    const element = this.wheels[i];
                    let index = element.getSelectedIndex() || 0;
                    let item = element.items[index]
                    
                    data.push(this.cols[i][index])
                    let v = (Number(item.innerText) <= 9) ? '0'+item.innerText : item.innerText;
                    values.push(v);
                }
                this.pickerSelect = data;
                this.$emit('on-change',values,data);
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
        },
        onConfirm() {
            if(!this._canConfirm()){
                return false;
            }
            
            let values = [];
            for(let i=0; i<this.pickerSelect.length; i++) {
                const el = this.pickerSelect[i];
                let v = (Number(el) <= 9) ? '0'+el : el;
                values.push(v);
            }
            this.$emit('on-selected',values,this.pickerSelect)
            this.closePicker()
        }
    },
    watch: {
        value(val) {
            if(val && !this.wheels.length){
                this._initData();
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
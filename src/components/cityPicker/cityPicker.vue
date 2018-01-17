<template>
    <div>
        <transition name="overlay"><div class="modal-overlay"  v-show="show"></div></transition>
        <transition name="picker">
            <div class="picker" v-show="show">
                <div class="picker-panel" >
                    <div class="picker-title">
                        <span class="cancel" @click="closePicker">取消</span>
                        <h2 class="title">{{title}}</h2>
                        <span class="confirm pickerClose" @click="sureSelect">确定</span>
                    </div>
                    <div class="picker-content">
                        <div class="mask-top border-1px"></div>
                        <div class="wheel-wrapper">
                            <div class="wheel">
                                <ul class="wheel-scroll">
                                    <li class="wheel-item" v-for="(item, i) in province" :key="i" :id="item.value">{{item.name}}</li>
                                </ul>
                            </div>
                            <div class="wheel">
                                <ul class="wheel-scroll">
                                    <li class="wheel-item" v-for="(item, i) in cities" :key="i" :id="item.value">{{item.name}}</li>
                                </ul>
                            </div>
                            <div class="wheel">
                                <ul class="wheel-scroll">
                                    <li class="wheel-item" v-for="(item, i) in areas" :key="i" :id="item.value">{{item.name}}</li>
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
        defaultValue: Array
    },
    data() {
        return {
            show: false,
            wheels: [],
            pickerSelect: [], //选择的值
            selectIndex: [0,0,0], //记录input中的值在picker中的位置
            areasArray:['province','cities','areas'],
            province: [],
            cities: [],
            areas: []
        }
    },
    created() {
        if(this.value){
            this.show = true
        }
    },
    methods: {
        //加载数据
        _initData() {
            let len = this.data.length;
			this.province = [];
			
			for(let i=0; i<len; i++){
				if(this.data[i].parent){
					break;
				}
				this.province.push(this.data[i])
            }

            this.$nextTick(() => {
                this.wheels[0].refresh();
                this.wheels[0].wheelTo(0);
                this.renderChain(0);

                if(this.defaultValue.length){
                    this.setValue()
                } 
            })
           
        },
        //初始化picker滚动部分
        _initScroll() {
            const _this = this;

            let wrapper = document.querySelectorAll(".wheel");

            for(let i=0; i<wrapper.length; i++){
                this.wheels[i] = new Bscroll(wrapper[i],{
                    wheel:{selectedIndex: _this.selectIndex[i]},
                    probeType: 3
                })

                this.wheels[i].on("scrollEnd",function(pos){
                    let index = _this.wheels[i].getSelectedIndex();

                    _this.renderChain(i)
                })
            }

            this._initData();
        },
        //渲染省市区
        renderChain(i) {
            if(i > 1){
                return false;
            }
            
            this.$nextTick(() => {
                let index = this.wheels[i].getSelectedIndex() || 0;
                let id = this.wheels[i].items[index].id;

                this[this.areasArray[i+1]] = this.getchildren(id);
                this.wheels[i+1].refresh();
                this.wheels[i+1].wheelTo(0);

                this.renderChain(i+1)
            })
            
        },
        //根据上级查找下级，例如根据省id查找该省所有的市
        getchildren(id) {
            let len = this.data.length;
            let arr =[];

            for(var i=0; i<len; i++){
				if(this.data[i].parent == id){
					arr.push(this.data[i])
				}
            }
            return arr;
        },
        //设置默认省市区
        setValue(index=0) {
            const _this = this;
            const len = this.areasArray.length;
            const element = this[this.areasArray[index]];

            if(index > len-1){
                return false;
            }

            for (let i = 0; i < element.length; i++) {
                if(element[i].name == _this.defaultValue[index]){
                    _this.$nextTick(() => {
                        _this.wheels[index].wheelTo(i)
                        _this.renderChain(index)
                        /* _this.$nextTick(() => {
                            _this.setValue(i+1)
                        }) */
                        setTimeout(() => {
                            _this.setValue(index+1) 
                        },200)
                    })
                    break;
                }
            }
        },
        //获取用户选中的省市区
        getValue() {
            let data = [];
            let ids = [];
            let values = [];

            for (let i = 0; i < this.wheels.length; i++) {
                const element = this.wheels[i];
                let index = element.getSelectedIndex() || 0;
                let item = element.items[index]
                
                data.push({
                    name: item.innerText,
                    id: item.id
                })

                ids.push(item.id);
                values.push(item.innerText);
            }

            this.$emit('on-shadow-change',values, ids, data)
        },
        //关闭频picker
        closePicker() {
            
            this.show = false;
        },
        //确定选择
        sureSelect() {
            if(!this._canConfirm()){
                return false;
            }
            this.getValue();
            this.show = false;
        },
        //判断是否滚动结束
        _canConfirm() {
            return this.wheels.every((wheel) => {
                return !wheel.isInTransition
            })
        }
    },
    watch: {
        show(val) {
            this.$emit('input', val)
            if(val){
                this._initScroll()
            }
        },
        value(val) {
            this.show = val;
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

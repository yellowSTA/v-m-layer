<template>
    <div>
        <ul class="list">
            <li class="item"><router-link :to="{name:'alert'}">alert</router-link></li>
            <li class="item"><router-link :to="{name:'confirm'}">confirm</router-link></li>
            <li class="item"><router-link :to="{name:'toptip'}">toptip</router-link></li>
            <li class="item"><router-link :to="{name:'toast'}">toast</router-link></li>
            <li class="item"><router-link :to="{name:'loading'}">loading</router-link></li>
            <li class="item"><router-link :to="{name:'actions'}">actions</router-link></li>
            <li class="item"><router-link :to="{name:'picker'}">picker</router-link></li>
            <li class="item"><router-link :to="{name:'cityPicker'}">cityPicker</router-link></li>
            <li class="item"><router-link :to="{name:'timePicker'}">timePicker</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
a{display: block;color: black;text-decoration: none}
.list{
    text-align: center;
    overflow: hidden;
    list-style: none;
}
.list .item{
    float: left;
    width: 33.33%;
    height: 100px;
    line-height: 100px;
    border-left: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
    background: #fff;
}
</style>

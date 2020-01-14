import Vue from 'vue'
import Router from 'vue-router'
import home from '@/demos/index'
import alert from '@/demos/alert'
import confirm from '@/demos/confirm'
import toptip from '@/demos/toptip'
import toast from '@/demos/toast'
import actions from '@/demos/actions'
import picker from '@/demos/picker'
import cityPicker from '@/demos/cityPicker'
import loading from '@/demos/loading'
import timePicker from '@/demos/timePicker'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/alert',
            name: 'alert',
            component: alert
        },
        {
            path: '/confirm',
            name: 'confirm',
            component: confirm
        },
        {
            path: '/toptip',
            name: 'toptip',
            component: toptip
        },
        {
            path: '/toast',
            name: 'toast',
            component: toast
        },
        {
            path: '/actions',
            name: 'actions',
            component: actions
        },
        {
            path: '/picker',
            name: 'picker',
            component: picker
        },
        {
            path: '/cityPicker',
            name: 'cityPicker',
            component: cityPicker
        },
        {
            path: '/loading',
            name: 'loading',
            component: loading
        },
        {
            path: '/timePicker',
            name: 'timePicker',
            component: timePicker
        }
    ]
})
import Alert from './alert/index'
import Toast from './toast/index'
import Toptip from './toptip/index'
import Confirm from './confirm/index'
import Loading from './loading/index'
import ActionSheet from './actionSheet/index'
import Picker from './picker/index'
import DatePicker from './datePicker/index'
import CityPicker from './cityPicker/index'

const components = [
    ActionSheet,
    Picker,
    DatePicker,
    CityPicker
]

const install = function(Vue) {
    // 判断是否安装
    if (install.installed) return;

    const layer = Vue.prototype.$layer;
    if (!layer) {
        Vue.use(Alert)
        Vue.use(Toast)
        Vue.use(Toptip)
        Vue.use(Confirm)
        Vue.use(Loading)
    }
    
    components.forEach(component => {
        Vue.component(component.name, component);
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default install


export {
    install,
    Alert,
    Toast,
    Toptip,
    Confirm,
    Loading,
    ActionSheet,
    Picker,
    DatePicker,
    CityPicker
}
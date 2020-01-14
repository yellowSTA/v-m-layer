import actions from './src/components/actions/actions.vue';
import picker from './src/components/picker/picker.vue';
import cityPicker from './src/components/cityPicker/cityPicker.vue';
import timePicker from './src/components/timePicker/timePicker.vue';
import AlertPlugins from './src/plugins/alert'
import ToastPlugins from './src/plugins/toast'
import ConfirmPlugins from './src/plugins/confirm'
import ToptipPlugins from './src/plugins/toptip'
import LoadingPlugins from './src/plugins/loading'
import chinaAddress from './src/datas/address.json'
import getNames from './src/plugins/getName'

export {
    actions,
    picker,
    cityPicker,
    AlertPlugins,
    ToastPlugins,
    ConfirmPlugins,
    ToptipPlugins,
    LoadingPlugins,
    chinaAddress,
    getNames,
    timePicker
}
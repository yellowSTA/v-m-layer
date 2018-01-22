import toast from './src/components/toast/toast.vue';
import alert from './src/components/alert/alert.vue';
import confirm from './src/components/confirm/confirm.vue';
import toptip from './src/components/toptip/toptip.vue';
import loading from './src/components/loading/loading.vue';
import actions from './src/components/actions/actions.vue';
import picker from './src/components/picker/picker.vue';
import cityPicker from './src/components/cityPicker/cityPicker.vue';
import AlertPlugins from './src/plugins/alert'
import ToastPlugins from './src/plugins/toast'
import ConfirmPlugins from './src/plugins/confirm'
import ToptipPlugins from './src/plugins/toptip'
import LoadingPlugins from './src/plugins/loading'
import chinaAddress from './src/datas/address.json'
import getNames from './src/plugins/getName'

export {
    toast,
    alert,
    confirm,
    toptip,
    loading,
    actions,
    picker,
    cityPicker,
    AlertPlugins,
    ToastPlugins,
    ConfirmPlugins,
    ToptipPlugins,
    LoadingPlugins,
    chinaAddress,
    getNames
}
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ECharts from 'vue-echarts'

Vue.component('v-chart', ECharts)

import {
  Button, Spin, FormModel, Input, Icon, Checkbox, Menu,
  Layout, Col, Row, Select, Table, DatePicker, Dropdown, Avatar,
  ConfigProvider, Upload, Modal, message, Pagination
} from 'ant-design-vue';

Vue.component(Layout.name, Layout)
Vue.component(Layout.Sider.name, Layout.Sider)
Vue.component(Layout.Content.name, Layout.Content)
Vue.component(Layout.Header.name, Layout.Header)
Vue.component(Button.name, Button)
Vue.component(Spin.name, Spin)
Vue.component(FormModel.name, FormModel.Item)
Vue.component(FormModel.Item.name, FormModel.Item)
Vue.component(Input.name, Input)
Vue.component(Input.Search.name, Input.Search)
Vue.component(Input.TextArea.name, Input.TextArea)
Vue.component(Icon.name, Icon)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Col.name, Col)
Vue.component(Row.name, Row)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Table.name, Table)
Vue.component(Pagination.name, Pagination)
Vue.component(DatePicker.name, DatePicker)
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Avatar.name, Avatar)
Vue.component(ConfigProvider.name, ConfigProvider)
Vue.component(Upload.name, Upload)
Vue.component(Modal.confirm.name, Modal.confirm)

Vue.use(Modal)

Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

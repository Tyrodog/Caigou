import Vue from 'vue'
import App from './App.vue'
import {
  Container, Aside, Header, Main, Menu, Submenu, MenuItem, MenuItemGroup, Button, Breadcrumb, BreadcrumbItem, Dropdown, DropdownItem, DropdownMenu, Row,
  Col, Card, Table, TableColumn, Form,FormItem, Input, Select,Switch,Option,DatePicker, Dialog, Pagination, MessageBox, Message
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './stroe'
import axios from 'axios'
import './assets/less/index.less'
import './assets/api/mock'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)

Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)

Vue.use(Row)
Vue.use(Col)
Vue.use(Card)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Form)
Vue.use(FormItem)

Vue.use(Dialog)

Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)

Vue.use(Pagination)

router.beforeEach((to,from,next)=>{
  store.commit('Users/getToken')
  const token = store.state.Users.token
  if(!token && to.name !== 'Login'){
    next({name: 'Login'})
  }else if(token && to.name === 'Login'){
    next({name:'Home'})
  } else{
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  beforeCreate() {
    Vue.prototype.$axios = axios
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$message = Message
  },
  created(){
    store.commit('CommonAside/addMenu',router)
  }
}).$mount('#app')

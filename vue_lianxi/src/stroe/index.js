import Vue from 'vue'
import Vuex from 'vuex'
import CommonAside from './commonAside'
import CommonHeader from './commonHeader'
import CommonHome from './commonHome'
import User from './user'
import Users from './users'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        CommonAside,
        CommonHeader,
        CommonHome,
        User,
        Users
    }
})
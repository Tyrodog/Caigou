import Cookie from 'js-cookie'
export default {
    namespaced: true,
    actions:{},
    mutations:{
        setToken(state,val){
            state.token = val
            // 参数一：cookie名称
            Cookie.set('token',val)
        },
        clearToken(state){
            state.token = ''
            // 清空名称为'token'的token
            Cookie.remove('token')
        },
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }
    },
    state:{
        token:''
    },
    getters:{}
}
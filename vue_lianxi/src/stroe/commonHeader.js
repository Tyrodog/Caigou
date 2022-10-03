export default {
    namespaced: true,
    actions: {},
    mutations: {
        clickMenu(state, val) {
            if (val.name !== 'Home') {
                // state.currentMenu = val
                /* const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabsList.push(val)
                } */
                const result = state.tabsList.findIndex(item=> item.name === val.name)
                if(result===-1){
                    state.tabsList.push(val)
                }
                /* else {
                    state.currentMenu = null
                } */
            }
        },
        onlyMenu(state){
            state.tabsList = state.tabsList.filter(item=>item.name==="Home")
            console.log(state.tabsList,'-----state.tabsList');
        }
    },
    state: {
        userImg: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.Qx5qyg22OGR4fJFZSGpZ8AAAAA?w=184&h=185&c=7&r=0&o=5&dpr=1.75&pid=1.7',
        tabsList: [
            {
                path: '/',
                name: 'Home',
                label: '首页',
                icon: 's-home'
            }
        ],
        currentMenu:null
    },
    getters: {}
}
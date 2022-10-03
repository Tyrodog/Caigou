import Cookie from 'js-cookie'
export default {
    namespaced: true,
    actions: {},
    mutations: {
        handleMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../pages/CommonHome/${item.url}`)
                        return item
                    })
                    console.log(...item.children, '我是item.children');
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../pages/CommonHome/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加
            console.log(menuArray, '我他妈的是menuArray啊  好好看看我别看错了');
            console.log(router, '我是router');
            console.log(router.options.routes[0].children.length,'我是children的长度');
            if (!router.options.routes[0].children.length) {
                menuArray.forEach(item => {
                    router.addRoute('Main', item)
                    // console.log(1);
                })
            }
            console.log(router.options.routes,'我是children的长度');
        }
    },
    state: {
        menu: [
            /*  {
                 path: '/',
                 name: 'Home',
                 label: '首页',
                 icon: 's-home',
                 url: 'Home/Home'
             },
             {
                 path: '/mall',
                 name: 'Mall',
                 label: '商品管理',
                 icon: 'video-play',
                 url: 'MallManage/MallManage'
             },
             {
                 path: '/user',
                 name: 'User',
                 label: '用户管理',
                 icon: 'user',
                 url: 'UserManage/UserManage'
             },
             {
                 label: '其他',
                 name: 'Page',
                 path: '/page',
                 icon: 'location',
                 children: [
                     {
                         path: 'page1',
                         name: 'Page1',
                         label: '页面1',
                         icon: 'setting',
                         url: 'Other/PageOne'
                     },
                     {
                         path: 'page2',
                         name: 'Page2',
                         label: '页面2',
                         icon: 'setting',
                         url: 'Other/PageTwo'
                     }
                 ]
             }, */
        ],
        isCollapse: false
    },
    getters: {
        noChildren(state) {
            return state.menu.filter((item) => !item.children);
        },
        hasChildren(state) {
            return state.menu.filter((item) => item.children);
        },
    }
}
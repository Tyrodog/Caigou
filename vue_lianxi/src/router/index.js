import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main'
import Home from '../pages/CommonHome/CommonHome'
import Mall from '../pages/CommonHome/Mall/Mall'
import Page1 from '../pages/CommonHome/Page/Page1'
import Page2 from '../pages/CommonHome/Page/Page2'
import User from '../pages/CommonHome/User/User'
import Login from '../pages/Login/Login'

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name:'Main',
            component: Main,
            // redirect: '/',
            children: [
                /* {
                    name: 'Home',
                    path: '/',
                    component: Home,
                },
                {
                    name: 'Mall',
                    path: '/mall',
                    component: Mall,
                },
                {
                    name: 'User',
                    path: '/user',
                    component: User,
                },
                {
                    name: 'Page1',
                    path: '/page1',
                    component: Page1,
                },
                {
                    name: 'Page2',
                    path: '/page2',
                    component: Page2,
                }, */
            ]
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        }
    ]
})
const originnalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    // console.log(location);   // 路由的name和path
    return originnalPush.call(this, location).catch(err => err)
}

export default router


/* function fn() {
    return arr.filter((item, index) => {
        return arr.indexOf(item) === index;
    })
}
var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false,
    undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];
console.log(fn(arr)) */
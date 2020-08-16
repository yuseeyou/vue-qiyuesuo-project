import Vue from 'vue'
import VueRouter, {Route, RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import {httpGet} from "@/utils/http";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/',
        name: 'Layout',
        components: {layout: () => import('@/views/layout.vue')},
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import(/* webpackChunkName: "about" */ '@/views/home/index.vue')
            },
            {
                path: 'audit',
                name: 'Audit',
                component: () => import(/* webpackChunkName: "about" */ '@/views/audit/index.vue')
            },
            {
                path: 'employee',
                name: 'Employee',
                component: () => import(/* webpackChunkName: "about" */ '@/views/organization/employee.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        components: {
            login: () => import(/* webpackChunkName: "about" */ '@/views/login/index.vue')
        }
    },
    {
        path: "/404",
        name: '404',
        components: {
            404: () => import('@/views/404.vue')
        }
    },
    {
        path: "*",
        redirect: "/404"
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


let timer: any;
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        clearInterval(timer);
        refreshToken();
        timer = setInterval(() => {
            refreshToken();
        }, 10000)
    } else {
        clearInterval(timer)
    }
    next();
})

// 刷新token状态
async function refreshToken() {
    await httpGet('api/system/message/unreadcount');
}

//vue-router 做单页应用的时候重复点击一个跳转的路由会出现报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any): Promise<Route> {
    // @ts-ignore
    return originalPush.call(this, location).catch<never>((e: never) => e)
}


export default router

import { createRouter,createWebHistory,RouteRecordRaw } from "vue-router";

const layout = () => import ('@/layout/index.vue')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: layout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'sy',
                meta: {name: '首页',icon: 'Location'},
                component: () => import("../view/home/index.vue"),
            },
            {
                path: '/user',
                name: 'user',
                meta: {name: '用户管理',icon: 'House'},
                component: () => import("../view/user/index.vue"),
            },
            {
                path: '/department',
                name: 'dp',
                meta: {name: '部门管理',icon: 'Document'},
                component: () => import("../view/department/index.vue"),
            },
            {
                path: '/flowChart',
                name: 'fc',
                meta: {name: '流程图',icon: 'Document'},
                component: () => import("../view/flowChart/index.vue"),
            },
            {
              path: '/test',
              name: 'test',
              meta: {name: '测试',icon: 'Document'},
              component: () => import("../view/test/index.vue"),
          },
        ]
    },
    {
        path: '/login',
        name: 'dl',
        component: () => import("../view/login/index.vue"),
    },
    {
        path: '/404',
        name: '404',
        component: () => import("../view/error/index.vue"),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'error',
        redirect: '/404',
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.VITE_BASEURL),
    // 页面进行切换时，新切换的页面始终保持在最顶端
    // （上个页面有滚动条，并且滚动到页面中间位置，新页面切换过后滚动位置始终在最顶端）
    scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0,behavior: 'smooth', }
    },
})

export default router

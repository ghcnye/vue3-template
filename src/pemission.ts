import router from './router'

router.beforeEach((to, from, next) => {
    const token:string|null = localStorage.getItem('token')
    if(!token && to.path !== '/login') {
        next('/login');
    }else {
        next()
    }
});

router.afterEach((to, from) => {
    
});
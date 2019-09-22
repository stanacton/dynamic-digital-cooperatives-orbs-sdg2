import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
    },
    {
      path: '/farmers',
      name: 'farmers',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/Farmers.vue'),
    },
    {
      path: '/co-op/create/',
      name: 'CoOpCreateNoCommodity',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/CoOpCreate.vue'),
    },
    {
      path: '/crop/create/',
      name: 'CropCreate',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/CropCreate.vue'),
    },
    {
      path: '/co-op/create/:commodity',
      name: 'CoOpCreate',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/CoOpCreate.vue'),
    },
    {
      path: '/co-op/:id/join',
      name: 'CoOpJoin',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/CoOp.vue'),
    },
    {
      path: '/co-op/:id',
      name: 'CoOp',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/CoOp.vue'),
    },
    {
      path: '/analytics',
      name: 'Analytics',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/Analytics.vue'),
    },
    {
      path: '/buyers',
      name: 'Buyers',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/Buyers.vue'),
    },
    {
      path: '/orders/create',
      name: 'CreateOrder',
      meta: {
        layout: 'complex',
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "farmeres" */ './views/OrderCreate.vue'),
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/404.vue'),
      meta: {
        layout: 'plain'
      },
      redirect: { name: 'home' }
    }
  ],
});

export default router;

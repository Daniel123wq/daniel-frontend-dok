/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import store from '@/utils/auth/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes: [

        {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
            path: '',
            component: () => import('./layouts/main/Main.vue'),
            children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
              {
                path: '/',
                name: 'home',
                component: () => import('./views/Home.vue')
              },
              {
                path: '/usuarios',
                name: 'Usuários',
                component: () => import('./views/cadastro/Usuarios.vue')
              },
              {
                path: '/categorias',
                name: 'Categorias',
                component: () => import('./views/cadastro/Categorias.vue')
              },
              {
                path: '/produtos',
                name: 'Produto',
                component: () => import('./views/cadastro/Produto.vue')
              },
            ],
            beforeEnter: (to, from, next) => {
              var auth = localStorage.getItem('token')
              if (!auth) {
                // store.commit('auth/logout')
                next('/login')
              } else {
                  next()
                // Vue.http.get('usuario')
                //   .then(response => {
                //     next()
                //   }, response => {
                //     next('/login')
                //   })
              }
            },
        },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
        {
            path: '',
            component: () => import('@/layouts/full-page/FullPage.vue'),
            children: [
        // =============================================================================
        // PAGES
        // =============================================================================
              {
                path: '/register',
                name: 'page-register',
                component: () => import('@/views/pages/RegisterJWT.vue')
              },
              {
                path: '/login',
                name: 'page-login',
                component: () => import('@/views/pages/Login.vue')
              },
              {
                path: '/pages/error-404',
                name: 'page-error-404',
                component: () => import('@/views/pages/Error404.vue')
              },
            ]
        },
        // Redirect to 404 page, if no match found
        {
            path: '*',
            redirect: '/pages/error-404'
        }
    ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = "none";
    }
})

router.beforeEach(function (to, from, next) {
  let middleware
  store.state.page = null
  to.matched.some(m => {
    middleware = m.meta.guard
  })
  if (typeof middleware === 'undefined') {
    next()
  } else {
    if (store.getters['auth/checkPermission'](middleware)) {
      window.scrollTo(0, 0)
      next()
    } else if (store.getters['auth/isLogged']) {
      next('/home')
    } else {
      next('/login')
    }
  }
})

export default router

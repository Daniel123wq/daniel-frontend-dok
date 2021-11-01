/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import auth from '@/utils/auth/store/'

Vue.use(Vuex)


// const mainModules = { auth }

export default new Vuex.Store({
    auth,
    getters,
    mutations,
    state,
    actions,
    strict: process.env.NODE_ENV !== 'production'
})

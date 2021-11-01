/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'
import dotenv from 'dotenv'
dotenv.config()
// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// axios
import axios from "./axios.js"
Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'



// Tailwind
import '@/assets/css/main.css'

// // W2UI 1.5
import '@/assets/utils/jquery.js'
import '@/assets/css/w2ui.css'
import { w2toolbar, w2layout, w2sidebar, w2grid, w2alert } from '@/assets/utils/w2ui.es6'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'

// VeeValidate
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import validationMessages from 'vee-validate/dist/locale/pt_BR';
Vue.use(VueI18n);
const i18n = new VueI18n();
i18n.locale = "pt_BR"; // set a default locale (without it, it won't work)
Vue.use(VeeValidate, {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
   en: validationMessages
  }
});


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


Vue.config.productionTip = false


new Vue({
    router,
    store, w2toolbar, w2layout, w2sidebar, w2grid, w2alert,
    // eslint-disable-next-line
    $,
    render: h => h(App)
}).$mount('#app')

import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import * as filters from '@/utils/filters.js';
import VueSimpleAlert from 'vue-simple-alert';

Vue.config.productionTip = false;
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
Vue.use(VueSimpleAlert, { reverseButtons: true });

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

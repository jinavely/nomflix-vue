import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import movies from '@/store/modules/movies';
import auth from '@/store/modules/auth';

const store = new Vuex.Store({
  modules: {
    movies,
    auth,
  },
});

export default store;

import { loginUser } from '@/api/auth';
import {
  saveAuthToCookie,
  saveUserToCookie,
  saveNickToCookie,
  getUserFromCookie,
  getNickFromCookie,
  deleteCookie,
} from '@/utils/cookies';

const authStore = {
  state: {
    user: {},
    token: '',
  },

  getters: {
    isLoggedIn(state) {
      return !!state.token || getUserFromCookie();
    },
    userToken(state) {
      return state.token;
    },
    userNickname(state) {
      return state.user.nickname || getNickFromCookie();
    },
  },

  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.user = '';
      state.token = '';
      deleteCookie('til_auth');
      deleteCookie('til_user');
      deleteCookie('til_nick');
    },
  },
  actions: {
    async LOGIN({ commit }, data) {
      const response = await loginUser(data);
      commit('SET_TOKEN', response.data.token);
      commit('SET_USER', response.data.user);
      saveAuthToCookie(response.data.token);
      saveUserToCookie(response.data.user.username);
      saveNickToCookie(response.data.user.nickname);

      return response;
    },
  },
};

export default authStore;

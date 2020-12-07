import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import { getUserFromCookie } from '@/utils/cookies';

import MainPage from '@/views/MainPage';
import SearchPage from '@/views/SearchPage';
import SignupPage from '@/views/member/SignupPage';
import LoginPage from '@/views/member/LoginPage';
import MovieDeailPage from '@/views/movies/MovieDeailPage';
import PostAddPage from '@/views/posts/PostAddPage';
import PostListPage from '@/views/posts/PostListPage';
import PostEditPage from '@/views/posts/PostEditPage';
import NotFoundPage from '@/views/NotFoundPage';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',

  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
      beforeEnter(to, from, next) {
        store.getters['isLoggedIn'] ? next('/main') : next();
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter(to, from, next) {
        store.getters['isLoggedIn'] ? next('/main') : next();
      },
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage,
      beforeEnter,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
      beforeEnter,
    },
    {
      path: '/movie/:id',
      name: 'movieDetail',
      component: MovieDeailPage,
      beforeEnter,
    },
    {
      path: '/add',
      name: 'add',
      component: PostAddPage,
      beforeEnter,
    },
    {
      path: '/post',
      name: 'post',
      component: PostListPage,
      beforeEnter,
    },
    {
      path: '/post/:id',
      name: 'edit',
      component: PostEditPage,
      beforeEnter,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFoundPage,
    },
  ],
});

function beforeEnter(to, from, next) {
  if (store.getters['isLoggedIn'] || getUserFromCookie()) {
    next();
  } else {
    alert('로그인을 해주세요.');
    next('/login');
  }
}

export default router;

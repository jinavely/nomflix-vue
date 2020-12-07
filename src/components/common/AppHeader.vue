<template>
  <header ref="appHeader">
    <div class="nav">
      <router-link to="/" class="logo">
        <i class="icon ion-social-youtube"></i>
      </router-link>

      <span v-if="isLoggedIn">{{ userNickname }}님 환영해요.</span>

      <div class="login">
        <template v-if="!isLoggedIn">
          <router-link to="/login">
            로그인
          </router-link>
          <router-link to="/signup">회원가입</router-link>
        </template>
        <template v-else>
          <a href="#" @click.prevent="logoutUser" class="logout-button">
            로그아웃
          </a>
        </template>

        <router-link to="/search">
          <i class="icon ion-search"></i>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isLoggedIn', 'userNickname']),
  },

  methods: {
    logoutUser() {
      this.$store.commit('LOGOUT');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
header {
  position: relative;
  z-index: 10;
  color: #fff;
  background-color: #7952b3;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}
a {
  color: #fff;
}
.nav {
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
}
.nav a {
  margin: 0 5px;
}
.nav nav {
  display: inline-block;
  margin-left: 10px;
  font-size: 1.2rem;
}
.logo {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
}
.login {
  display: flex;
  margin-left: auto;
}
</style>

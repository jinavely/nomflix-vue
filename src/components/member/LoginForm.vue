<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <PageHeader>Login</PageHeader>
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">ID</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div>
          <label for="password">PW</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button class="btn" :disabled="loginValid">
          login
        </button>
      </form>
      <p class="log">
        {{ logMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/common/PageHeader.vue';

export default {
  data() {
    return {
      username: '',
      password: '',
      nickname: '',
      logMessage: '',
    };
  },

  components: {
    PageHeader,
  },

  computed: {
    loginValid() {
      return !this.username || !this.password;
    },
  },

  methods: {
    async submitForm() {
      try {
        await this.$store.dispatch('LOGIN', {
          username: this.username,
          nickname: this.nickname,
          password: this.password,
        });

        this.$router.push('/main');

        //10분후 자동 로그아웃 여부
        setInterval(() => {
          this.$confirm('로그인 연장하시겠습니까?')
            .then(() => {
              return;
            })
            .catch(() => {
              this.$store.commit('LOGOUT');
              this.$router.push('/login');
              this.$router.go(0);
            });
        }, 6000 * 10);
      } catch (error) {
        this.logMessage = error.response.data;
        console.log(error);
      } finally {
        this.initForm();
      }
    },

    initForm() {
      this.username = '';
      this.nickname = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>
.btn {
  color: white;
}
.btn:disabled {
  opacity: 0.5;
  cursor: no-drop;
}
</style>

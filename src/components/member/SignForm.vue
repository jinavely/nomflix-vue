<template>
  <div class="contents">
    <div class="form-wrapper">
      <PageHeader>회원가입</PageHeader>
      <form @submit.prevent="registerUser" class="form">
        <div>
          <label for="username">ID</label>
          <input type="text" id="username" v-model="username" />
          <p class="validation-text" v-if="usernameValid">
            <span class="warning">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">PW</label>
          <input type="password" id="password" v-model="password" />
          <p class="validation-text" v-if="passwordValid">
            <span class="warning">
              Password must be over 8 letters
            </span>
          </p>
        </div>
        <div>
          <label for="nickname">Nickname</label>
          <input type="text" id="nickname" v-model="nickname" />
        </div>
        <button type="submit" class="btn" :disabled="btnValid">
          Create
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
import { signupUser } from '@/api/auth';
import { validateEmail, validatePassword } from '@/utils/validation';

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
    usernameValid() {
      return !validateEmail(this.username);
    },
    passwordValid() {
      return !validatePassword(this.password);
    },
    btnValid() {
      return (
        this.usernameValid ||
        this.passwordValid ||
        !this.username ||
        !this.password
      );
    },
  },

  methods: {
    async registerUser() {
      try {
        const userData = {
          username: this.username,
          password: this.password,
          nickname: this.nickname,
        };

        await signupUser(userData);
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
      } finally {
        this.initForm();
      }
    },

    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style scoped>
.form {
  height: 100%;
}
.form .validation-text {
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.btn {
  color: white;
}
.btn:disabled {
  opacity: 0.5;
  cursor: no-drop;
}
.log {
  width: 460px;
}
</style>

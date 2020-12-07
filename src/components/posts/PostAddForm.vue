<template>
  <div class="contents">
    <PageHeader>할 일 쓰기</PageHeader>

    <div class="form-wrapper">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="title">Title</label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents</label>
          <textarea
            name="contents"
            id="contents"
            cols="30"
            rows="5"
            v-model="contents"
          ></textarea>
          <p class="validation-text">
            <span class="warning" v-if="contentsLenthValid">
              Maximum Length is 250
            </span>
            <span>{{ contents.length }} / 250</span>
          </p>
        </div>
        <button
          type="submit"
          class="btn"
          :disabled="createBtnValid"
          :class="createBtnValid ? 'disabled' : null"
        >
          Create
        </button>
        <router-link to="/post" class="btn">List</router-link>
      </form>
      <p class="log">
        {{ resultMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import { createPost } from '@/api/posts';
import PageHeader from '@/components/common/PageHeader.vue';

export default {
  data() {
    return {
      title: '',
      contents: '',
      resultMessage: '',
    };
  },

  computed: {
    createBtnValid() {
      return !this.title || !this.contents || this.contentsLenthValid;
    },

    contentsLenthValid() {
      return this.contents.length > 250;
    },
  },

  components: {
    PageHeader,
  },

  methods: {
    async submitForm() {
      try {
        await createPost({
          title: this.title,
          contents: this.contents,
        });

        this.$router.push('/post');
      } catch (error) {
        console.log(error);
        this.resultMessage = error;
      } finally {
        this.initForm();
      }
    },

    initForm() {
      this.title = '';
      this.contents = '';
    },
  },
};
</script>

<style scoped>
.form textarea {
  margin-bottom: 0;
}
.form .validation-text {
  margin-bottom: 1rem;
  font-size: 1rem;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.form .validation-text.reverse {
  flex-direction: row;
}
.btn {
  color: white;
  vertical-align: middle;
}
.log {
  width: 420px;
}
a.btn {
  padding: 0.4rem 1.5rem;
  margin-left: 5px;
}
</style>

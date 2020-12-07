<template>
  <div class="contents">
    <PageHeader>할 일 수정</PageHeader>

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
          :class="createBtnValid ? 'disalbed' : null"
          :disabled="createBtnValid"
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
import { fetchPostById, editPost } from '@/api/posts';
import PageHeader from '@/components/common/PageHeader.vue';

export default {
  data() {
    return {
      title: '',
      contents: '',
      resultMessage: '',
    };
  },

  components: {
    PageHeader,
  },

  computed: {
    createBtnValid() {
      return !this.title || !this.contents || this.contentsLenthValid;
    },

    contentsLenthValid() {
      return this.contents.length > 250;
    },
  },

  methods: {
    setForm(data) {
      this.title = data.title;
      this.contents = data.contents;
    },

    async submitForm() {
      await editPost(this.$route.params.id, {
        title: this.title,
        contents: this.contents,
      });

      this.$router.push('/post');
    },
  },

  async created() {
    try {
      const { data } = await fetchPostById(this.$route.params.id);
      this.setForm(data);
    } catch (error) {
      console.log(error);
    }
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
.btn:disabled {
  opacity: 0.5;
  cursor: no-drop;
}
a.btn {
  padding: 0.4rem 1.5rem;
  margin-left: 5px;
}
.log {
  width: 420px;
}
</style>

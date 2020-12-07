<template>
  <div>
    <div class="search-box">
      <form @submit.prevent="searchFn">
        <input
          type="search"
          class="search-txt"
          placeholder="영화를 검색하세요."
          v-model="searchTxt"
        />
        <button class="search-btn" type="submit">
          <i class="icon ion-search"></i>
        </button>
      </form>
    </div>

    <div v-if="movieItem.results" class="results-box">
      <template v-if="movieItem.results">
        <h3>{{ logMessage }}</h3>

        <ul class="movie-list">
          <li v-for="item in movieItem.results" :key="item.id">
            <router-link :to="`/movie/${item.id}`">
              <div class="movie-image" v-if="item.backdrop_path">
                <img
                  :src="domainImageFn + item.backdrop_path"
                  :alt="item.original_title"
                />
              </div>
              <div class="movie-title">{{ item.title }}</div>
              <div class="movie-date">
                {{ item.release_date }}
              </div>
            </router-link>
          </li>
        </ul>
      </template>
      <LoadingSpinner v-else></LoadingSpinner>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { searchMovie } from '@/api/movies';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchTxt: '',
      movieItem: {},
      logMessage: '',
    };
  },

  computed: {
    ...mapGetters(['domainImageFn']),
  },

  components: {
    LoadingSpinner,
  },

  methods: {
    async searchFn() {
      try {
        if (!this.searchTxt) {
          this.$alert('검색어를 입력해주세요!');
          return;
        }

        const { data } = await searchMovie(this.searchTxt);
        this.movieItem = data;
        console.log(this.movieItem);
        this.movieItem.results.length !== 0
          ? (this.logMessage = `"${this.searchTxt}" 영화 검색 결과`)
          : (this.logMessage = `"${this.searchTxt}" 영화 검색 결과가 없습니다.`);
      } catch (error) {
        this.logMessage = error;
      } finally {
        this.initForm();
      }
    },

    initForm() {
      this.searchTxt = '';
    },
  },
};
</script>

<style scoped>
.search-box {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #2f3640;
  border-radius: 40px;
  width: 45px;
  padding: 5px;
  transition: 0.4s;
}
.search-box:after {
  content: '';
  display: block;
  clear: both;
}
.search-btn {
  color: #e84118;
  float: right;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 0;
}
.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #fff;
  font-size: 16px;
  transition: 0.4s;
  line-height: 35px;
  width: 0;
}
.search-box:hover {
  width: 50vw;
}
.search-box:hover .search-txt {
  width: calc(100% - 40px);
  padding: 0 6px;
}
.search-box:hover .search-btn {
  background: #fff;
}
.results-box h3 {
  margin: 7px;
  padding: 30px 0 10px 0;
}
</style>

<template>
  <div>
    <div v-if="movieItem.id">
      <div
        class="detail-wrap"
        v-if="movieItem.backdrop_path"
        :style="{
          backgroundImage: `url(${domainBgFn}${movieItem.backdrop_path})`,
        }"
      >
        <div class="info">
          <div class="image-view" v-if="movieItem.poster_path">
            <img
              :src="`${domainImageFn}${movieItem.poster_path}`"
              :alt="movieItem.original_title"
            />
          </div>
          <div class="info-view">
            <h3>{{ movieItem.title }}</h3>
            <div class="etc-view">
              <span class="year">· {{ movieItem.release_date }}</span>
              <span class="time">· {{ movieItem.runtime }}분</span>
              <ul class="kind">
                <li v-for="genre in movieItem.genres" :key="genre.id">
                  · {{ genre.name }}
                </li>
              </ul>
              <a
                :href="movieItem.homepage"
                target="_blank"
                v-if="movieItem.homepage"
              >
                <i class="icon ion-link"></i>
              </a>
            </div>
            <div class="overview">{{ movieItem.overview }}</div>

            <div
              class="videos"
              v-if="movieItem.videos && movieItem.videos.results[0]"
            >
              <iframe
                v-if="movieItem.videos.results[0]"
                :src="`${domainYoutubeFn}${movieItem.videos.results[0].key}`"
                frameborder="0"
                allow=" fullscreen"
                width="640"
                height="360"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { movieDetail } from '@/api/movies';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      movieItem: {},
    };
  },

  computed: {
    ...mapGetters(['domainImageFn', 'domainBgFn', 'domainYoutubeFn']),
  },

  components: {
    LoadingSpinner,
  },

  async mounted() {
    try {
      const { data } = await movieDetail(this.$route.params.id);
      this.movieItem = data;
      return;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scope>
.detail-wrap {
  height: calc(100vh - 104px);
  width: 100%;
  position: relative;
  padding: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.detail-wrap:after {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  background-color: rgb(40, 40, 40);
  opacity: 0.8;
  content: '';
  display: block;
}
.info {
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  color: #fff;
}
.image-view {
  width: 30%;
  height: 100%;
  border-radius: 5px;
}
.info-view {
  width: 70%;
  margin-left: 10px;
}
.info-view h3 {
  font-size: 2rem;
  margin-top: 0;
}
.etc-view {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0;
  font-size: 0.9rem;
}
.etc-view > a {
  font-size: 2rem;
  color: #fff;
  margin: 0 0 0 10px;
}
.etc-view span {
  margin: 0 10px 0 0;
}
.kind li {
  display: inline;
}
.overview {
  width: 85%;
  line-height: 1.7;
  word-break: keep-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* 라인수 */
  -webkit-box-orient: vertical;
}
.videos {
  margin-top: 25px;
}
</style>

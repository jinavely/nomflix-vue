<template>
  <div class="movie-wrap">
    <template v-if="nowPlaying.results || popular.results || upcoming.results">
      <MovieText :text="'최신 상영작'"></MovieText>
      <swiper
        class="swiper movie-list"
        ref="movieSwiper"
        :options="swiperOption"
      >
        <swiper-slide v-for="item in nowPlaying.results" :key="item.id">
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
        </swiper-slide>
      </swiper>

      <MovieText :text="'인기순'"></MovieText>
      <swiper
        class="swiper movie-list"
        ref="movieSwiper"
        :options="swiperOption"
      >
        <swiper-slide v-for="item in popular.results" :key="item.id">
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
        </swiper-slide>
      </swiper>

      <MovieText :text="'상영 예정작'"></MovieText>
      <swiper
        class="swiper movie-list"
        ref="movieSwiper"
        :options="swiperOption"
      >
        <swiper-slide v-for="item in upcoming.results" :key="item.id">
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
        </swiper-slide>
      </swiper>
    </template>
    <LoadingSpinner v-else></LoadingSpinner>
  </div>
</template>

<script>
import MovieText from '@/components/movies/MovieText.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { nowPlaying, Popular, upcoming } from '@/api/movies';
import { mapGetters } from 'vuex';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  name: 'swiper-example-centered-slides',
  title: 'Centered slides',

  data() {
    return {
      nowPlaying: {},
      popular: {},
      upcoming: {},

      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: false,

        breakpoints: {
          768: {
            slidesPerView: 3,
          },
          540: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        },
      },
    };
  },

  computed: {
    ...mapGetters(['domainImageFn']),
  },

  components: {
    MovieText,
    LoadingSpinner,
    Swiper,
    SwiperSlide,
  },

  methods: {
    onSwiper(swiper) {
      console.log(swiper);
    },
    onSlideChange() {
      console.log('slide change');
    },
  },

  async mounted() {
    try {
      const { data: now } = await nowPlaying();
      const { data: pop } = await Popular();
      const { data: up } = await upcoming();

      this.nowPlaying = now;
      this.popular = pop;
      this.upcoming = up;

      return;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scope>
.app-contents {
  overflow: hidden;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
}
.movie-list .swiper-slide {
  position: relative;
  flex-grow: 1;
  width: 250px;
  height: 210px;
  margin: 7px;
  padding: 10px 20px;
  background: white;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.08);
  border-radius: 3px;
}
.movie-list.swiper-container {
  overflow: visible;
}
.movie-title {
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.movie-image {
  text-align: center;
}
.movie-date {
  position: absolute;
  bottom: 4px;
  right: 5px;
  font-size: 14px;
  color: #9e9e9e;
}
</style>

const movieStore = {
  state: {
    nowPlaying: [],
    popular: [],
    upcoming: [],
    domainImage: 'https://image.tmdb.org/t/p/w300/',
    domainBg: 'https://image.tmdb.org/t/p/original/',
    domainYoutube: 'https://www.youtube.com/embed/',
  },

  getters: {
    domainImageFn(state) {
      return state.domainImage;
    },
    domainBgFn(state) {
      return state.domainBg;
    },
    domainYoutubeFn(state) {
      return state.domainYoutube;
    },
  },

  mutations: {
    SET_NOW_PLAYING(state, data) {
      state.nowPlaying = data;
    },
    SET_POPULAR(state, data) {
      state.popular = data;
    },
    SET_COMMING(state, data) {
      state.upcoming = data;
    },
  },

  actions: {},
};

export default movieStore;

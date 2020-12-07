import { movie } from '@/api/index';

// 현재 상영작
function nowPlaying() {
  return movie.get('movie/now_playing');
}

// 인기순
function Popular() {
  return movie.get('movie/popular');
}

// 상영 예정작
function upcoming() {
  return movie.get('movie/upcoming');
}

// 상세보기
function movieDetail(id) {
  return movie.get(`movie/${id}`, {
    params: {
      append_to_response: 'videos',
    },
  });
}

// 검색
function searchMovie(keyword) {
  return movie.get(`search/movie`, {
    params: {
      query: keyword,
    },
  });
}

export { nowPlaying, Popular, upcoming, movieDetail, searchMovie };

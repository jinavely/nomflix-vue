import axios from 'axios';
import { setInterceptors } from '@/api/config/interceptors';

// 회원가입, 로그인
function create(url, options) {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  return instance;
}

// CRUD
function createPosts(url, options) {
  const instance = axios.create(Object.assign({ baseURL: url }, options));
  setInterceptors(instance);
  return instance;
}

// 영화
function moviesApi() {
  const movie = axios.create(
    Object.assign(
      {
        baseURL: 'https://api.themoviedb.org/3/',
      },
      {
        params: {
          api_key: '44d320cdaba3f7739188319732eaf8cb',
          language: 'ko-KR',
        },
      },
    ),
  );

  return movie;
}

export const auth = create(process.env.VUE_APP_API_URL);
export const posts = createPosts(`${process.env.VUE_APP_API_URL}posts/`);
export const movie = moviesApi();

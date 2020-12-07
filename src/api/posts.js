import { posts } from '@/api/index';

function createPost(data) {
  return posts.post('/', data);
}

function fetchPosts() {
  return posts.get('/');
}

function fetchPostById(id) {
  return posts.get(id);
}

function editPost(id, data) {
  return posts.put(id, data);
}

function deletePost(id) {
  return posts.delete(id);
}

export { createPost, fetchPosts, fetchPostById, editPost, deletePost };

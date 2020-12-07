<template>
  <div>
    <div class="main list-container contents">
      <CreateButton></CreateButton>
      <MovieList></MovieList>
    </div>
  </div>
</template>

<script>
import CreateButton from '@/components/common/CreateButton.vue';
import MovieList from '@/components/movies/MovieList.vue';

export default {
  components: {
    CreateButton,
    MovieList,
  },
};
</script>

<style scoped></style>

<template>
  <h3 class="title">
    {{ text }}
  </h3>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style scope>
.title {
  font-size: 1.5rem;
  margin: 0 7px;
  padding: 20px 0 10px 0;
}
</style>

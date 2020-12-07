<template>
  <div class="app">
    <AppHeader></AppHeader>
    <div class="app-contents">
      <router-view></router-view>
    </div>
    <AppFooter></AppFooter>
    <!-- <ToastPopup></ToastPopup> -->
  </div>
</template>

<script>
import AppFooter from '@/components/common/AppFooter.vue';
import AppHeader from '@/components/common/AppHeader.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
@import url('./assets/css/reset.css');
@import url('./assets/css/common.css');
</style>

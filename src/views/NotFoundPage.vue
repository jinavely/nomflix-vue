<template>
  <div class="notFound">
    <PageHeader>Is Not Found Page</PageHeader>
  </div>
</template>

<script>
import PageHeader from '@/components/common/PageHeader.vue';

export default {
  components: {
    PageHeader,
  },
};
</script>

<style scope>
.notFound {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 104px);
}
</style>

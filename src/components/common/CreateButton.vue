<template>
  <div>
    <router-link to="/add" class="button create-button">
      <i class="icon ion-plus-round"></i>
    </router-link>
    <router-link to="/post" class="button post-button">
      <i class="icon ion-ios-list-outline"></i>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: fixed;
  right: 10px;
  top: 60px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  background: #fe9616;
  border: 3px solid white;
}
.post-button {
  right: 55px;
}
</style>

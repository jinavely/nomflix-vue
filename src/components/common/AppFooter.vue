<template>
  <footer>
    <a href="#" target="_blank">View GitHub source</a>
    <div>© 2020 MeTube</div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 52px;
  padding: 0 20px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #364f6b;
  color: white;
}
footer a {
  color: white;
}
</style>

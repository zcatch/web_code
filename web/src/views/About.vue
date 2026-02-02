<template>
  <div class="about container">
    <h1>关于我</h1>
    <div class="glass-panel content">
      <p>
        你好！我是一名热衷于构建卓越软件体验的开发者。
        <br>
        这是基于 Vue 2, Vuex 和 Vite 搭建的现代化个人官网模板。
        <br><br>
        我擅长将创意设计转化为流畅的代码，注重细节与用户体验。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about {
  padding: 4rem 20px;
}

h1 {
  margin-bottom: 2rem;
  font-size: 3rem;
}

.content {
  padding: 2rem;
}
</style>

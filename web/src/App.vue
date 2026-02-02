<template>
  <div id="app">
    <nav class="navbar glass-panel">
      <div class="container navbar-content">
        <div class="logo gradient-text">NEXUS</div>
        <div class="links">
          <router-link to="/">主页</router-link>
          <router-link to="/about">关于</router-link>
        </div>
      </div>
    </nav>

    <transition name="fade" mode="out-in">
      <router-view class="page-content" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 70px;
  border-radius: 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  /* Glass effect stays via glass-panel class */
}

/* Adjust navbar content to fit new rounded shape if needed */
.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.page-content {
  padding-top: 0; /* REMOVED padding */
  height: 100%;
  width: 100%;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

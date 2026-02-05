<template>
  <div id="app">
    <nav class="navbar glass-panel">
      <div class="container navbar-content">
        <!-- Left -->
        <div class="nav-left">
          <router-link to="/" class="logo-link">
            <div class="logo gradient-text">NEXUS</div>
          </router-link>
        </div>
        
        <!-- Center -->
        <div class="nav-center">
          <router-link to="/blog" class="nav-item">博客</router-link>
        </div>

        <!-- Right -->
        <div class="nav-right">
          <router-link to="/about" class="nav-item">关于</router-link>
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
  background-color: var(--color-bg);
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
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.nav-left, .nav-right {
  flex: 1;
  display: flex;
  align-items: center;
}

.nav-left {
  justify-content: flex-start;
}

.nav-right {
  justify-content: flex-end;
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.logo-link {
  text-decoration: none;
}

.nav-item {
  font-weight: 500;
  font-size: 1.05rem;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: var(--color-text-main);
  position: relative;
}

.nav-item:hover, .nav-item.router-link-active {
  color: var(--color-primary);
  background: rgba(255, 255, 255, 0.5);
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
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

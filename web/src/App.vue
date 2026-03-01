<template>
  <div id="app">
    <nav class="navbar glass-panel">
      <div class="container navbar-content">
        <!-- Left -->
        <div class="nav-left">
          <router-link to="/" class="logo-link">
            <div class="logo gradient-text">AIZO</div>
          </router-link>
        </div>
        
        <!-- Center -->
        <div class="nav-center">
          <router-link 
            to="/blog" 
            class="nav-item"
            :class="{ 'router-link-active': $route.path.startsWith('/blog') }"
          >博客</router-link>
          <router-link 
            to="/learning" 
            class="nav-item"
            :class="{ 'router-link-active': $route.path.startsWith('/learning') }"
          >学习笔记</router-link>
          <router-link 
            to="/qa" 
            class="nav-item"
            :class="{ 'router-link-active': $route.path.startsWith('/qa') }"
          >问答中心</router-link>
        </div>

        <!-- Right -->
        <div class="nav-right">
          <router-link to="/about" class="nav-item">关于</router-link>
        </div>
      </div>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" class="page-content" />
      </transition>
    </router-view>
    
    <!-- 返回顶部火箭按钮 -->
    <BackToTop />
  </div>
</template>

<script setup>
import BackToTop from '@/components/BackToTop.vue';

// <script setup> 模式下，导入的组件可以直接在模板中使用，无需注册
</script>

<style scoped>
#app {
  min-height: 100vh;
  width: 100%;
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
  background: transparent;
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
  padding-top: 0;
  width: 100%;
  min-height: calc(100vh - 70px); /* Fill space without forcing 100% height */
}

/* Transitions - Fixed for Vue 3 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ========== 响应式导航栏 ========== */
@media (max-width: 768px) {
  .navbar {
    height: 60px;
  }
  
  .navbar-content {
    padding: 0 16px;
  }
  
  .logo {
    font-size: 1.4rem;
  }
  
  .nav-center {
    gap: 15px;
  }
  
  .nav-item {
    font-size: 0.95rem;
    padding: 6px 12px;
  }
}

@media (max-width: 576px) {
  .navbar {
    height: 55px;
  }
  
  .navbar-content {
    padding: 0 12px;
  }
  
  .logo {
    font-size: 1.3rem;
  }
  
  .nav-center {
    gap: 10px;
  }
  
  .nav-item {
    font-size: 0.9rem;
    padding: 5px 10px;
    border-radius: 6px;
  }
  
  .nav-item.router-link-active::after {
    width: 16px;
  }
}

@media (max-width: 480px) {
  .navbar {
    height: 50px;
  }
  
  .navbar-content {
    padding: 0 10px;
  }
  
  .logo {
    font-size: 1.2rem;
  }
  
  .nav-item {
    font-size: 0.85rem;
    padding: 4px 8px;
  }
}
</style>

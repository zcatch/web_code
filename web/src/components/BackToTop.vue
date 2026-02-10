<template>
  <transition name="rocket-fade">
    <div 
      v-show="showButton && !hasFlownAway" 
      class="rocket-btn"
      :class="{ 'is-launching': isLaunching, 'is-flying-away': hasFlownAway }"
      @click="scrollToTop"
      title="返回顶部"
    >
      <!-- 火箭SVG图标 -->
      <svg class="rocket-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 8 6 8 12C8 14.5 9 17 10 19L12 22L14 19C15 17 16 14.5 16 12C16 6 12 2 12 2Z" fill="currentColor"/>
        <path d="M12 2C12 2 8 6 8 12C8 14.5 9 17 10 19L12 22L14 19C15 17 16 14.5 16 12C16 6 12 2 12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="10" r="2" fill="white" opacity="0.9"/>
        <!-- 左翼 -->
        <path d="M8 12C6 13 5 15 5 17L8 15V12Z" fill="currentColor"/>
        <!-- 右翼 -->
        <path d="M16 12C18 13 19 15 19 17L16 15V12Z" fill="currentColor"/>
      </svg>
      
      <!-- 喷射火焰效果 -->
      <div class="flame-container">
        <div class="flame flame-1"></div>
        <div class="flame flame-2"></div>
        <div class="flame flame-3"></div>
      </div>
      
      <!-- 烟雾粒子效果 -->
      <div class="smoke-particles" v-if="isLaunching">
        <span v-for="n in 12" :key="n" class="smoke-particle" :style="{ '--delay': n * 0.03 + 's', '--offset': (n % 3 - 1) * 10 + 'px' }"></span>
      </div>
      
      <!-- 飞行尾迹 -->
      <div class="trail-container" v-if="isLaunching">
        <div class="trail trail-1"></div>
        <div class="trail trail-2"></div>
        <div class="trail trail-3"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      showButton: false,
      isLaunching: false,
      hasFlownAway: false,
      scrollThreshold: 300,
      checkInterval: null,
    };
  },
  mounted() {
    // 使用定时轮询来检测滚动位置，确保所有页面都能检测到
    this.startScrollCheck();
  },
  beforeDestroy() {
    this.stopScrollCheck();
  },
  methods: {
    startScrollCheck() {
      // 每100ms检查一次滚动位置
      this.checkInterval = setInterval(() => {
        this.checkScrollPosition();
      }, 100);
      
      // 立即检查一次
      this.checkScrollPosition();
    },
    stopScrollCheck() {
      if (this.checkInterval) {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
      }
    },
    checkScrollPosition() {
      let maxScrollTop = 0;
      
      // 检查所有可能的滚动容器
      const selectors = [
        '.snap-container',   // 首页的滚动容器
        '.home-container',
        '.blog-page', 
        '.about-page',
        '.page-content',
        '#app'
      ];
      
      selectors.forEach(selector => {
        const container = document.querySelector(selector);
        if (container && container.scrollTop > maxScrollTop) {
          maxScrollTop = container.scrollTop;
        }
      });
      
      // 也检查 window/document 的滚动
      const windowScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (windowScroll > maxScrollTop) {
        maxScrollTop = windowScroll;
      }
      
      this.showButton = maxScrollTop > this.scrollThreshold;
    },
    getScrollableContainer() {
      // 找到当前有滚动的容器
      const selectors = ['.snap-container', '.home-container', '.blog-page', '.about-page', '.page-content', '#app'];
      
      for (const selector of selectors) {
        const container = document.querySelector(selector);
        if (container && container.scrollTop > 0) {
          return container;
        }
      }
      
      return null;
    },
    scrollToTop() {
      if (this.isLaunching) return;
      
      this.isLaunching = true;
      
      // 延迟一点让动画先开始
      setTimeout(() => {
        // 滚动所有可能有滚动的容器
        const selectors = ['.snap-container', '.home-container', '.blog-page', '.about-page', '.page-content', '#app'];
        
        selectors.forEach(selector => {
          const container = document.querySelector(selector);
          if (container && container.scrollTop > 0) {
            container.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }
        });
        
        // 也滚动 window
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 120);
      
      // 火箭飞走
      setTimeout(() => {
        this.hasFlownAway = true;
      }, 860);
      
      // 动画结束后重置
      setTimeout(() => {
        this.hasFlownAway = false;
        this.isLaunching = false;
      }, 1450);
    }
  },
  watch: {
    '$route'() {
      // 路由变化时重新检查
      this.$nextTick(() => {
        this.checkScrollPosition();
      });
    }
  }
};
</script>

<style scoped>
.rocket-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.3s ease;
  overflow: visible;
  will-change: transform, opacity;
  -webkit-tap-highlight-color: transparent;
  tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  -webkit-touch-callout: none;
  outline: none;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

.rocket-btn:focus,
.rocket-btn:focus-visible,
.rocket-btn:active {
  outline: none;
}

.rocket-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #ec4899);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
  z-index: 1;
  transition: opacity 0.08s linear, box-shadow 0.3s ease;
}

.rocket-btn:hover {
  transform: translateY(-5px) scale(1.05);
}

.rocket-btn:hover::before {
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.rocket-btn:active {
  transform: translateY(-2px) scale(0.98);
}

/* 火箭图标 */
.rocket-icon {
  width: 28px;
  height: 28px;
  z-index: 2;
  transition: transform 0.3s ease;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

.rocket-btn:hover .rocket-icon {
  animation: rocketHover 0.5s ease infinite;
}

@keyframes rocketHover {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

/* 火焰容器 */
.flame-container {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 25px;
  display: flex;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.rocket-btn:hover .flame-container {
  opacity: 0.8;
}

.rocket-btn.is-launching .flame-container {
  opacity: 1;
}

/* 火焰 */
.flame {
  position: absolute;
  bottom: 0;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}

.flame-1 {
  width: 12px;
  height: 20px;
  background: linear-gradient(to top, #ff6b35, #ffd700, #fff);
  animation: flameFlicker 0.15s ease-in-out infinite alternate;
}

.flame-2 {
  width: 8px;
  height: 16px;
  left: -4px;
  background: linear-gradient(to top, #ff4500, #ff8c00);
  animation: flameFlicker 0.12s ease-in-out infinite alternate-reverse;
}

.flame-3 {
  width: 8px;
  height: 16px;
  right: -4px;
  left: auto;
  background: linear-gradient(to top, #ff4500, #ff8c00);
  animation: flameFlicker 0.13s ease-in-out infinite alternate;
}

@keyframes flameFlicker {
  0% { 
    transform: scaleY(0.9) scaleX(0.9);
    opacity: 0.8;
  }
  100% { 
    transform: scaleY(1.1) scaleX(1.1);
    opacity: 1;
  }
}

/* 发射中状态 - 真正的飞行效果 */
.rocket-btn.is-launching {
  animation: rocketTakeoff 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  pointer-events: none;
  /* 发射时背景消失 */
  background: transparent !important;
  background-color: transparent !important;
  color: #a855f7;
  border-radius: 50%;
}

.rocket-btn.is-launching::before {
  opacity: 0 !important;
  transition: none !important;
}

.rocket-btn.is-launching .rocket-icon {
  animation: rocketShake 0.12s ease-in-out infinite;
  /* 火箭变成橙红色 */
  filter: none;
  opacity: 0.98;
}

.rocket-btn.is-launching .flame-container {
  opacity: 1;
  animation: flamePowerUp 1s ease-out forwards;
}

.rocket-btn.is-launching .flame-1 {
  animation: flameBurst 0.12s ease-in-out infinite alternate;
}

.rocket-btn.is-launching .flame-2,
.rocket-btn.is-launching .flame-3 {
  animation: flameBurst 0.14s ease-in-out infinite alternate-reverse;
}

/* 火箭起飞动画 - 先蓄力再飞走 */
@keyframes rocketTakeoff {
  0% {
    transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  12% {
    transform: translate3d(0, 7px, 0) scale(1.08) rotate(0deg);
    opacity: 1;
  }
  28% {
    transform: translate3d(-2px, -12px, 0) scale(1.05) rotate(-3deg);
    opacity: 1;
  }
  55% {
    transform: translate3d(4px, -52vh, 0) scale(0.96) rotate(3deg);
    opacity: 0.95;
  }
  100% {
    transform: translate3d(-6px, -145vh, 0) scale(0.84) rotate(-6deg);
    opacity: 0;
  }
}

@keyframes rocketShake {
  0%, 100% { transform: translateX(-2px) rotate(-2deg); }
  50% { transform: translateX(2px) rotate(2deg); }
}

/* 火焰增强动画 */
@keyframes flamePowerUp {
  0% {
    transform: translateX(-50%) scaleY(1) scaleX(1);
  }
  25% {
    transform: translateX(-50%) scaleY(2.2) scaleX(1.2);
  }
  100% {
    transform: translateX(-50%) scaleY(3.4) scaleX(1.45);
  }
}

@keyframes flameBurst {
  0% { 
    transform: scaleY(1.35) scaleX(0.88);
    height: 30px;
  }
  100% { 
    transform: scaleY(2) scaleX(1.2);
    height: 36px;
  }
}

/* 烟雾粒子 - 增强版 */
.smoke-particles {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  pointer-events: none;
}

.smoke-particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, rgba(255, 200, 100, 0.9), rgba(255, 100, 50, 0.6));
  border-radius: 50%;
  animation: smokeExplosion 0.8s ease-out forwards;
  animation-delay: var(--delay);
  left: calc(50% + var(--offset, 0px));
  box-shadow: 0 0 10px rgba(255, 150, 50, 0.5);
}

.smoke-particle:nth-child(odd) {
  background: radial-gradient(circle, rgba(255, 190, 120, 0.85), rgba(255, 110, 50, 0.45));
  box-shadow: 0 0 8px rgba(255, 150, 50, 0.4);
}

@keyframes smokeExplosion {
  0% {
    opacity: 1;
    transform: translateY(0) scale(0.5);
  }
  50% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
    transform: translateY(72px) translateX(var(--offset, 0)) scale(2.2);
  }
}

/* 飞行尾迹 */
.trail-container {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 200px;
  pointer-events: none;
  overflow: visible;
}

.trail {
  position: absolute;
  top: 0;
  border-radius: 50% 50% 100% 100%;
  animation: trailStretch 0.9s ease-out forwards;
}

.trail-1 {
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  background: linear-gradient(to bottom, #ffd700, #ff6b35, transparent);
  animation-delay: 0s;
}

.trail-2 {
  left: 30%;
  transform: translateX(-50%);
  width: 5px;
  background: linear-gradient(to bottom, #ff8c00, #ff4500, transparent);
  animation-delay: 0.05s;
}

.trail-3 {
  left: 70%;
  transform: translateX(-50%);
  width: 5px;
  background: linear-gradient(to bottom, #ff8c00, #ff4500, transparent);
  animation-delay: 0.05s;
}

@keyframes trailStretch {
  0% {
    height: 0;
    opacity: 1;
  }
  35% {
    height: 120px;
    opacity: 0.9;
  }
  100% {
    height: 240px;
    opacity: 0;
  }
}

/* 过渡动画 */
.rocket-fade-enter-active,
.rocket-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.rocket-fade-enter,
.rocket-fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.5);
}

/* 响应式 */
@media (max-width: 768px) {
  .rocket-btn {
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
  }
  
  .rocket-icon {
    width: 24px;
    height: 24px;
  }
  
  .flame-container {
    width: 16px;
    height: 20px;
  }
  
  .flame-1 {
    width: 10px;
    height: 16px;
  }
  
  .flame-2, .flame-3 {
    width: 6px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .rocket-btn {
    right: 15px;
    bottom: 15px;
    width: 46px;
    height: 46px;
  }
  
  .rocket-icon {
    width: 22px;
    height: 22px;
  }
}

/* 触控优化 */
@media (hover: none) and (pointer: coarse) {
  .rocket-btn:hover {
    transform: none;
  }
  
  .rocket-btn:hover .flame-container {
    opacity: 0;
  }
  
  .rocket-btn:active {
    transform: scale(0.95);
  }
  
  .rocket-btn:active .flame-container {
    opacity: 1;
  }
}
</style>

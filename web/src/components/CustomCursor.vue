<template>
  <div class="cursor-wrapper" :class="{ 'hovering': isHovering }">
    <div class="cursor-dot" :style="dotStyle"></div>
    <div class="cursor-circle" :style="circleStyle"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const x = ref(-100);
const y = ref(-100);
const circleX = ref(-100);
const circleY = ref(-100);
const isHovering = ref(false);
let requestID = null;

const dotStyle = computed(() => ({
  transform: `translate(${x.value}px, ${y.value}px)`
}));

const circleStyle = computed(() => ({
  transform: `translate(${circleX.value}px, ${circleY.value}px)`
}));

const moveCursor = (e) => {
  x.value = e.clientX;
  y.value = e.clientY;
};

const animateCircle = () => {
  // Linear interpolation for smooth trailing
  const ease = 0.15;
  circleX.value += (x.value - circleX.value) * ease;
  circleY.value += (y.value - circleY.value) * ease;
  
  requestID = requestAnimationFrame(animateCircle);
};

const checkHover = (e) => {
  const target = e.target;
  if (
    target.tagName.toLowerCase() === 'a' ||
    target.tagName.toLowerCase() === 'button' ||
    target.closest('a') ||
    target.closest('button') ||
    target.classList.contains('clickable')
  ) {
    isHovering.value = true;
  } else {
    isHovering.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousemove", moveCursor);
  document.addEventListener("mouseover", checkHover);
  animateCircle();
});

onUnmounted(() => {
  document.removeEventListener("mousemove", moveCursor);
  document.removeEventListener("mouseover", checkHover);
  if (requestID) {
    cancelAnimationFrame(requestID);
  }
});
</script>

<style scoped>
.cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  mix-blend-mode: exclusion;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: -4px;
  left: -4px;
  will-change: transform;
}

.cursor-circle {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  position: absolute;
  top: -20px;
  left: -20px;
  will-change: transform;
  transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s;
}

.hovering .cursor-circle {
  width: 60px;
  height: 60px;
  top: -30px;
  left: -30px;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: transparent;
}

@media (max-width: 768px) {
  .cursor-wrapper {
    display: none;
  }
}
</style>

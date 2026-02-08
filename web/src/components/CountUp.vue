<template>
  <span class="count-up">{{ displayValue }}</span>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  endVal: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    default: 2000,
  },
});

const displayValue = ref(0);
let frame = null;
let startTime = null;

const animate = (timestamp) => {
  if (!startTime) startTime = timestamp;
  const progress = timestamp - startTime;
  const percentage = Math.min(progress / props.duration, 1);
  
  // Easing function (easeOutExpo)
  const ease = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
  
  displayValue.value = Math.floor(ease(percentage) * props.endVal);

  if (progress < props.duration) {
    frame = requestAnimationFrame(animate);
  } else {
    displayValue.value = props.endVal;
  }
};

const start = () => {
  startTime = null;
  if (frame) cancelAnimationFrame(frame);
  frame = requestAnimationFrame(animate);
};

watch(() => props.endVal, () => {
  start();
});

onMounted(() => {
  start();
});

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame);
});
</script>

<style scoped>
.count-up {
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
</style>

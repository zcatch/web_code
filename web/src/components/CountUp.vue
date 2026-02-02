<template>
  <span class="count-up">{{ displayValue }}</span>
</template>

<script>
export default {
  name: "CountUp",
  props: {
    endVal: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 2000,
    },
  },
  data() {
    return {
      displayValue: 0,
      frame: null,
      startTime: null,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      this.startTime = null;
      this.frame = requestAnimationFrame(this.animate);
    },
    animate(timestamp) {
      if (!this.startTime) this.startTime = timestamp;
      const progress = timestamp - this.startTime;
      const percentage = Math.min(progress / this.duration, 1);
      
      // Easing function (easeOutExpo)
      const ease = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
      
      this.displayValue = Math.floor(ease(percentage) * this.endVal);

      if (progress < this.duration) {
        this.frame = requestAnimationFrame(this.animate);
      } else {
        this.displayValue = this.endVal;
      }
    },
  },
  destroyed() {
    if (this.frame) cancelAnimationFrame(this.frame);
  },
  watch: {
    endVal() {
      this.start();
    }
  }
};
</script>

<style scoped>
.count-up {
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
}
</style>

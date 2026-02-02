<template>
  <div class="cursor-wrapper" :class="{ 'hovering': isHovering }">
    <div class="cursor-dot" :style="dotStyle"></div>
    <div class="cursor-circle" :style="circleStyle"></div>
  </div>
</template>

<script>
export default {
  name: "CustomCursor",
  data() {
    return {
      x: -100,
      y: -100,
      circleX: -100,
      circleY: -100,
      isHovering: false,
    };
  },
  computed: {
    dotStyle() {
      return {
        transform: `translate(${this.x}px, ${this.y}px)`
      };
    },
    circleStyle() {
      return {
        transform: `translate(${this.circleX}px, ${this.circleY}px)`
      };
    }
  },
  mounted() {
    document.addEventListener("mousemove", this.moveCursor);
    document.addEventListener("mouseover", this.checkHover);
    this.animateCircle();
  },
  destroyed() {
    document.removeEventListener("mousemove", this.moveCursor);
    document.removeEventListener("mouseover", this.checkHover);
  },
  methods: {
    moveCursor(e) {
      this.x = e.clientX;
      this.y = e.clientY;
    },
    animateCircle() {
      // Linear interpolation for smooth trailing
      const ease = 0.15;
      this.circleX += (this.x - this.circleX) * ease;
      this.circleY += (this.y - this.circleY) * ease;
      
      requestAnimationFrame(this.animateCircle);
    },
    checkHover(e) {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        this.isHovering = true;
      } else {
        this.isHovering = false;
      }
    }
  }
};
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

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    :stroke="color" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    class="feather-icon"
  >
    <!-- Github -->
    <path v-if="name === 'github'" d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    <!-- Twitter -->
    <path v-if="name === 'twitter'" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    <!-- Linkedin -->
    <path v-if="name === 'linkedin'" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect v-if="name === 'linkedin'" x="2" y="9" width="4" height="12"></rect>
    <circle v-if="name === 'linkedin'" cx="4" cy="4" r="2"></circle>
    <!-- External Link -->
    <path v-if="name === 'external-link'" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline v-if="name === 'external-link'" points="15 3 21 3 21 9"></polyline>
    <line v-if="name === 'external-link'" x1="10" y1="14" x2="21" y2="3"></line>
    <!-- Code -->
    <polyline v-if="name === 'code'" points="16 18 22 12 16 6"></polyline>
    <polyline v-if="name === 'code'" points="8 6 2 12 8 18"></polyline>
    <!-- Zap -->
    <polygon v-if="name === 'zap'" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    <!-- Layout -->
    <rect v-if="name === 'layout'" x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line v-if="name === 'layout'" x1="3" y1="9" x2="21" y2="9"></line>
    <line v-if="name === 'layout'" x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
